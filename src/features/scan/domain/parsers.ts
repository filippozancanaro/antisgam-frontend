/**
 * Parser puri per i JSON dell'export Instagram.
 * Accettano `unknown` perché il contenuto arriva da file caricati dall'utente:
 * ogni forma inattesa produce una lista vuota, mai un'eccezione.
 *
 * Meta usa due formati per le relationship:
 * - "legacy": `{ title, string_list_data: [{ href, value, timestamp }] }`, eventualmente
 *   avvolto in un oggetto `{ relationships_xxx: [...] }` (followers/following, export fino al 2025);
 * - "label_values" (export 2026, oggi per pending_follow_requests e removed_suggestions):
 *   `{ timestamp, media, label_values: [{ label, value }], fbid }`, a livello root come array
 *   oppure come singolo oggetto quando l'entry è una sola. Le `label` sono localizzate
 *   nella lingua dell'account ("Nome utente", "Username", ...).
 */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

/** Etichette (lowercase) con cui Meta indica lo username nelle varie lingue. */
const USERNAME_LABELS = new Set([
  "username",
  "nome utente",
  "nombre de usuario",
  "nom d'utilisateur",
  "benutzername",
  "nome de usuário",
  "gebruikersnaam",
]);

/** Gli username Instagram sono lowercase, cifre, punto e underscore (max 30). */
const USERNAME_PATTERN = /^[a-z0-9._]{1,30}$/;

const lastPathSegment = (url: string): string | undefined =>
  url
    .split(/[/?#]/)
    .filter(Boolean)
    .pop();

/**
 * Username da una lista `label_values`.
 * 1. etichetta nota per "username" (qualsiasi lingua supportata);
 * 2. ultimo segmento della URL del profilo, se presente;
 * 3. ultimo valore che "somiglia" a uno username (esclude il nome visualizzato,
 *    che può avere spazi/maiuscole/emoji).
 */
const extractFromLabelValues = (labelValues: unknown): string | null => {
  if (!Array.isArray(labelValues)) return null;

  const entries = labelValues.filter(isRecord).flatMap((entry) =>
    isNonEmptyString(entry.value)
      ? [{ label: typeof entry.label === "string" ? entry.label.trim().toLowerCase() : "", value: entry.value.trim() }]
      : [],
  );

  const byLabel = entries.find((entry) => USERNAME_LABELS.has(entry.label));
  if (byLabel) return byLabel.value;

  // La URL la riconosciamo dal valore, non dall'etichetta (anch'essa potenzialmente localizzata).
  const url = entries.find((entry) => /^https?:\/\//i.test(entry.value));
  const fromUrl = url ? lastPathSegment(url.value) : undefined;
  if (fromUrl && USERNAME_PATTERN.test(fromUrl)) return fromUrl;

  const candidates = entries.filter((entry) => USERNAME_PATTERN.test(entry.value));
  return candidates.length > 0 ? candidates[candidates.length - 1].value : null;
};

/** Estrae i nickname da una relationship, in qualsiasi dei formati noti. */
const extractNicknames = (relationship: unknown): string[] => {
  if (!isRecord(relationship)) return [];

  if ("label_values" in relationship) {
    const nickname = extractFromLabelValues(relationship.label_values);
    return nickname ? [nickname] : [];
  }

  const fromList = Array.isArray(relationship.string_list_data)
    ? relationship.string_list_data
        .map((entry) => (isRecord(entry) ? entry.value : undefined))
        .filter(isNonEmptyString)
    : [];

  if (fromList.length > 0) return fromList;

  return isNonEmptyString(relationship.title) ? [relationship.title] : [];
};

/** Nickname unici (in ordine di prima apparizione) da una lista di relationship. */
export const collectNicknames = (relationships: unknown): string[] => {
  if (!Array.isArray(relationships)) return [];

  const unique = new Set<string>();
  for (const relationship of relationships) {
    for (const nickname of extractNicknames(relationship)) unique.add(nickname.trim());
  }
  return Array.from(unique);
};

const isRelationship = (value: unknown): boolean =>
  isRecord(value) && ("label_values" in value || "string_list_data" in value || "title" in value);

/**
 * Normalizza la radice di un file in una lista di relationship:
 * array a livello root, oggetto wrapper `{ [wrapperKey]: [...] }`, oppure singola relationship.
 */
const relationshipsOf = (json: unknown, wrapperKey: string): unknown => {
  if (Array.isArray(json)) return json;
  if (!isRecord(json)) return [];
  if (wrapperKey in json) return json[wrapperKey];
  return isRelationship(json) ? [json] : [];
};

/** `followers_N.json` */
export const parseFollowers = (json: unknown): string[] =>
  collectNicknames(relationshipsOf(json, "relationships_followers"));

/** `following.json` */
export const parseFollowing = (json: unknown): string[] =>
  collectNicknames(relationshipsOf(json, "relationships_following"));

/** `pending_follow_requests.json` */
export const parsePendingRequests = (json: unknown): string[] =>
  collectNicknames(relationshipsOf(json, "relationships_follow_requests_sent"));

/** `removed_suggestions.json` */
export const parseRemovedSuggestions = (json: unknown): string[] =>
  collectNicknames(relationshipsOf(json, "relationships_dismissed_suggested_users"));

/** `JSON.parse` che non lancia: ritorna `undefined` su testo non valido. */
export const safeJsonParse = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

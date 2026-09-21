/**
 * Parser puri per i JSON dell'export Instagram.
 * Accettano `unknown` perché il contenuto arriva da file caricati dall'utente:
 * ogni forma inattesa produce una lista vuota, mai un'eccezione.
 */

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim() !== "";

/**
 * Estrae i nickname da una relationship Instagram.
 * Nei file "followers" il nickname è in `string_list_data[].value`,
 * in "following" è in `title` (e talvolta anche in `value`): li gestiamo entrambi.
 */
const extractNicknames = (relationship: unknown): string[] => {
  if (!isRecord(relationship)) return [];

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

/** `followers_N.json`: array di relationship a livello root. */
export const parseFollowers = (json: unknown): string[] => collectNicknames(json);

/** `following.json`: `{ relationships_following: [...] }` */
export const parseFollowing = (json: unknown): string[] =>
  isRecord(json) ? collectNicknames(json.relationships_following) : [];

/** `pending_follow_requests.json`: `{ relationships_follow_requests_sent: [...] }` */
export const parsePendingRequests = (json: unknown): string[] =>
  isRecord(json) ? collectNicknames(json.relationships_follow_requests_sent) : [];

/** `removed_suggestions.json`: `{ relationships_dismissed_suggested_users: [...] }` */
export const parseRemovedSuggestions = (json: unknown): string[] =>
  isRecord(json) ? collectNicknames(json.relationships_dismissed_suggested_users) : [];

/** `JSON.parse` che non lancia: ritorna `undefined` su testo non valido. */
export const safeJsonParse = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

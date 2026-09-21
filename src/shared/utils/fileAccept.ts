/**
 * Verifica se un file rispetta una lista `accept` in stile HTML
 * (MIME type, es. "application/zip", oppure estensione, es. ".zip").
 * Il MIME type è dichiarato dal browser e può essere vuoto o variare per OS,
 * quindi l'estensione è un fallback necessario.
 */
export const isFileAccepted = (file: File, accept: readonly string[] | null | undefined): boolean => {
  if (!accept || accept.length === 0) return true;

  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();

  return accept.some((rule) => {
    const normalized = rule.trim().toLowerCase();
    if (normalized === "") return false;
    if (normalized.startsWith(".")) return name.endsWith(normalized);
    if (normalized.endsWith("/*")) return type.startsWith(normalized.slice(0, -1));
    return type === normalized;
  });
};

/**
 * Nickname presenti in `current` ma non in `previous`.
 * Funzione pura. Senza scansione precedente (`undefined`) non c'è nulla con cui
 * confrontare, quindi non è "nuovo" niente e ritorna un insieme vuoto.
 */
export const findNewNicknames = (
  current: readonly string[],
  previous: readonly string[] | undefined,
): ReadonlySet<string> => {
  if (!previous) return new Set();

  const previousSet = new Set(previous);
  return new Set(current.filter((nickname) => !previousSet.has(nickname)));
};

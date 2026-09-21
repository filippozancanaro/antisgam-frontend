import type { ScanInput, ScanResult } from "../model/types";

/** Deduplica e ordina alfabeticamente (locale-aware). */
export const sortNicknames = (nicknames: Iterable<string>): string[] =>
  Array.from(new Set(nicknames)).sort((a, b) => a.localeCompare(b));

/**
 * Calcola gli "unfollowers": chi segui ma non ti segue.
 * Funzione pura: tutte le liste in output sono deduplicate e ordinate.
 */
export const analyzeScan = (input: ScanInput): ScanResult => {
  const followersSet = new Set(input.followers);

  return {
    followers: sortNicknames(input.followers),
    following: sortNicknames(input.following),
    pendingRequests: sortNicknames(input.pendingRequests),
    removedSuggestions: sortNicknames(input.removedSuggestions),
    unfollowers: sortNicknames(input.following.filter((nickname) => !followersSet.has(nickname))),
  };
};

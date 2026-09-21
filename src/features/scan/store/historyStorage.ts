import type { ScanRecord, ScanResult } from "../model/types";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toStringList = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const toScanResult = (value: unknown): ScanResult | null => {
  if (!isRecord(value)) return null;

  // Formato corrente
  if ("followers" in value && "following" in value) {
    return {
      followers: toStringList(value.followers),
      following: toStringList(value.following),
      unfollowers: toStringList(value.unfollowers),
      pendingRequests: toStringList(value.pendingRequests),
      removedSuggestions: toStringList(value.removedSuggestions),
    };
  }

  // Formato legacy (chiavi con suffisso "Data")
  if ("followersData" in value && "followingData" in value) {
    return {
      followers: toStringList(value.followersData),
      following: toStringList(value.followingData),
      unfollowers: toStringList(value.unfollowersData),
      pendingRequests: toStringList(value.pendingRequests),
      removedSuggestions: toStringList(value.removedSuggestions),
    };
  }

  return null;
};

const toScanRecord = (value: unknown): ScanRecord | null => {
  if (!isRecord(value)) return null;

  const timestamp = typeof value.timestamp === "number" ? value.timestamp : NaN;
  const data = toScanResult(value.data);
  if (!Number.isFinite(timestamp) || !data) return null;

  const id = typeof value.id === "string" && value.id !== "" ? value.id : String(timestamp);
  return { id, timestamp, data };
};

/**
 * Normalizza quanto letto dal localStorage in una lista di `ScanRecord`.
 * Supporta sia il formato corrente (`ScanRecord[]`) sia quello legacy
 * (`{ scansHistory: [{ timestamp, date, data: { followersData, ... } }] }`).
 * Qualsiasi valore non riconosciuto viene scartato.
 */
export const normalizeHistory = (raw: unknown): ScanRecord[] => {
  const list = Array.isArray(raw) ? raw : isRecord(raw) && Array.isArray(raw.scansHistory) ? raw.scansHistory : [];

  const seen = new Set<string>();
  const records: ScanRecord[] = [];
  for (const item of list) {
    const record = toScanRecord(item);
    if (!record || seen.has(record.id)) continue;
    seen.add(record.id);
    records.push(record);
  }

  return records.sort((a, b) => b.timestamp - a.timestamp);
};

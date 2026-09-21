import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { ScanRecord, ScanResult } from "../model/types";
import { normalizeHistory } from "./historyStorage";

export const SCAN_HISTORY_STORAGE_KEY = "antisgamdata";
export const SCAN_HISTORY_LIMIT = 10;

const jsonStorage = createJSONStorage<ScanRecord[]>(() => localStorage);

/** Storage che normalizza (e migra) qualsiasi cosa trovi nel localStorage. */
const historyStorage: typeof jsonStorage = {
  ...jsonStorage,
  getItem: (key, initialValue) => {
    try {
      return normalizeHistory(jsonStorage.getItem(key, initialValue));
    } catch {
      return initialValue;
    }
  },
};

/** Cronologia delle ultime scansioni, dalla più recente. */
export const scanHistoryAtom = atomWithStorage<ScanRecord[]>(
  SCAN_HISTORY_STORAGE_KEY,
  [],
  historyStorage,
  { getOnInit: true },
);

export const createScanRecord = (data: ScanResult, now: number = Date.now()): ScanRecord => ({
  id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
  timestamp: now,
  data,
});

/** Aggiunge una scansione in testa alla cronologia (max `SCAN_HISTORY_LIMIT`) e la ritorna. */
export const addScanToHistoryAtom = atom(null, (get, set, data: ScanResult): ScanRecord => {
  const record = createScanRecord(data);
  set(scanHistoryAtom, [record, ...get(scanHistoryAtom)].slice(0, SCAN_HISTORY_LIMIT));
  return record;
});

export const clearScanHistoryAtom = atom(null, (_get, set) => {
  set(scanHistoryAtom, []);
});

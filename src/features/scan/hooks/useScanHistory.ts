import { useMemo } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { addScanToHistoryAtom, clearScanHistoryAtom, scanHistoryAtom } from "../store/scanAtoms";
import type { ScanRecord } from "../model/types";

/** Cronologia completa, dalla scansione più recente. */
export const useScanHistory = (): ScanRecord[] => useAtomValue(scanHistoryAtom);

/** Singola scansione per id; `undefined` se non esiste (o non esiste più). */
export const useScanRecord = (id: string | undefined): ScanRecord | undefined => {
  const history = useScanHistory();
  return useMemo(() => (id ? history.find((record) => record.id === id) : undefined), [history, id]);
};

export const useAddScanToHistory = () => useSetAtom(addScanToHistoryAtom);

export const useClearScanHistory = () => useSetAtom(clearScanHistoryAtom);

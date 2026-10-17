import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/shared/ui";
import type { ScanInput } from "../model/types";
import { analyzeScan } from "../domain/analyzer";
import {
  InstagramExportError,
  readInstagramExport,
  type ExportErrorCode,
  type ExportWarningCode,
} from "../domain/instagramExport";
import { useAddScanToHistory } from "./useScanHistory";

const ERROR_MESSAGES: Record<ExportErrorCode, string> = {
  "invalid-zip": "Il file non sembra uno zip valido: verifica il file e riprova",
  "followers-missing": 'Nessun file json "followers" trovato nello zip',
  "following-missing": 'Nessun file json "following" trovato nello zip',
  "invalid-json": "Errore nell'analisi dei file JSON contenuti nello zip: verifica il file e riprova",
  "entry-too-large": "Uno dei file contenuti nello zip è troppo grande per essere analizzato",
};

const WARNING_MESSAGES: Record<ExportWarningCode, string> = {
  "pending-missing":
    'AVVISO: Nessuna informazione sulle "Richieste Inviate" trovata: l\'analisi finale non restituirà questa informazione',
  "removed-suggestions-missing":
    'AVVISO: Nessuna informazione sui "Suggerimenti Rimossi" trovata: l\'analisi finale non restituirà questa informazione',
};

/**
 * Gestisce il form della homepage: selezione dello zip, estrazione dei dati,
 * avvio dell'analisi (salvata in cronologia) e reset.
 * L'analisi è sincrona: `isAnalyzing` serve solo a mostrare l'overlay
 * finché non si apre la pagina dei risultati.
 */
export const useScanUpload = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const addScanToHistory = useAddScanToHistory();

  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState<ScanInput | null>(null);
  const [pendingScanId, setPendingScanId] = useState<string | null>(null);

  const clearSelection = useCallback(() => {
    setFile(null);
    setInput(null);
  }, []);

  const selectZipFile = useCallback(
    async (zipFile: File) => {
      setFile(zipFile);
      setInput(null);

      try {
        const { input: extracted, warnings } = await readInstagramExport(zipFile);
        warnings.forEach((code) => toast(WARNING_MESSAGES[code], "warning"));
        setInput(extracted);
      } catch (error) {
        const code: ExportErrorCode = error instanceof InstagramExportError ? error.code : "invalid-zip";
        toast(ERROR_MESSAGES[code], "error");
        setFile(null);
      }
    },
    [toast],
  );

  const submit = useCallback(() => {
    if (!input) {
      toast("Dati sui Followers o Following mancanti, impossibile procedere con la verifica.", "error");
      return;
    }

    const record = addScanToHistory(analyzeScan(input));
    setPendingScanId(record.id);
  }, [input, addScanToHistory, toast]);

  /** Fine dell'attesa minima: si apre la pagina dei risultati. */
  const finishAnalysis = useCallback(() => {
    if (!pendingScanId) return;

    setPendingScanId(null);
    navigate(`/results/${pendingScanId}`);
  }, [pendingScanId, navigate]);

  const reset = useCallback(() => {
    clearSelection();
    toast("Applicazione resettata.", "info");
  }, [clearSelection, toast]);

  return {
    file,
    isReady: input !== null,
    isAnalyzing: pendingScanId !== null,
    selectZipFile,
    clearSelection,
    submit,
    finishAnalysis,
    reset,
  };
};

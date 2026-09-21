import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
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
 */
export const useScanUpload = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const addScanToHistory = useAddScanToHistory();

  const [file, setFile] = useState<File | null>(null);
  const [input, setInput] = useState<ScanInput | null>(null);

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
        warnings.forEach((code) => enqueueSnackbar(WARNING_MESSAGES[code], { variant: "warning" }));
        setInput(extracted);
      } catch (error) {
        const code: ExportErrorCode = error instanceof InstagramExportError ? error.code : "invalid-zip";
        enqueueSnackbar(ERROR_MESSAGES[code], { variant: "error" });
        setFile(null);
      }
    },
    [enqueueSnackbar],
  );

  const submit = useCallback(() => {
    if (!input) {
      enqueueSnackbar(
        "Dati sui Followers o Following mancanti, impossibile procedere con la verifica.",
        { variant: "error" },
      );
      return;
    }

    const record = addScanToHistory(analyzeScan(input));
    navigate(`/loading/${record.id}`);
  }, [input, addScanToHistory, navigate, enqueueSnackbar]);

  const reset = useCallback(() => {
    clearSelection();
    enqueueSnackbar("Applicazione resettata.", { variant: "info" });
  }, [clearSelection, enqueueSnackbar]);

  return {
    file,
    isReady: input !== null,
    selectZipFile,
    clearSelection,
    submit,
    reset,
  };
};

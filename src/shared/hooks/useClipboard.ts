import { useCallback } from "react";
import { useSnackbar } from "notistack";

/** Copia testo negli appunti notificando l'esito. */
export const useClipboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  return useCallback(
    async (text: string) => {
      if (text === "") return;

      try {
        await navigator.clipboard.writeText(text);
        enqueueSnackbar("Testo copiato negli appunti", { variant: "info" });
      } catch {
        enqueueSnackbar("Impossibile copiare negli appunti", { variant: "error" });
      }
    },
    [enqueueSnackbar],
  );
};

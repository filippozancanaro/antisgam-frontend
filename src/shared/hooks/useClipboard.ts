import { useCallback } from "react";
import { useToast } from "@/shared/ui/toast/useToast";

/** Copia testo negli appunti notificando l'esito. */
export const useClipboard = () => {
  const toast = useToast();

  return useCallback(
    async (text: string) => {
      if (text === "") return;

      try {
        await navigator.clipboard.writeText(text);
        toast("Testo copiato negli appunti", "success");
      } catch {
        toast("Impossibile copiare negli appunti", "error");
      }
    },
    [toast],
  );
};

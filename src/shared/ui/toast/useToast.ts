import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { showToastAtom, type ToastVariant } from "./toastAtoms";

/**
 * Mostra un messaggio temporaneo. I toast vivono in un atom Jotai,
 * quindi la funzione è utilizzabile da qualsiasi punto dell'app.
 */
export const useToast = () => {
  const show = useSetAtom(showToastAtom);

  return useCallback(
    (message: string, variant: ToastVariant = "info") => show({ message, variant }),
    [show],
  );
};

import { useCallback, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { isFileAccepted } from "@/shared/utils/fileAccept";

export interface UseFilePickerOptions {
  accept?: readonly string[] | null;
  disabled?: boolean;
  onFileSelected: (file: File) => void | Promise<void>;
  onRejected?: (file: File) => void;
  onClear?: () => void;
}

/**
 * Logica del FilePicker: input nascosto, drag&drop, validazione del tipo e stato di caricamento.
 * Il file selezionato è controllato dal parent (`file` prop del componente).
 */
export const useFilePicker = ({ accept, disabled = false, onFileSelected, onRejected, onClear }: UseFilePickerOptions) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFile = useCallback(
    async (file: File | undefined) => {
      if (!file || disabled) return;

      if (!isFileAccepted(file, accept)) {
        onRejected?.(file);
        return;
      }

      setIsLoading(true);
      try {
        await onFileSelected(file);
      } finally {
        setIsLoading(false);
      }
    },
    [accept, disabled, onFileSelected, onRejected],
  );

  const openDialog = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      void handleFile(event.target.files?.[0]);
    },
    [handleFile],
  );

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      if (!disabled) setIsDraggingOver(true);
    },
    [disabled],
  );

  const handleDragLeave = useCallback(() => setIsDraggingOver(false), []);

  const handleDrop = useCallback(
    (event: DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDraggingOver(false);
      void handleFile(event.dataTransfer.files?.[0]);
    },
    [handleFile],
  );

  const clear = useCallback(() => {
    if (inputRef.current) inputRef.current.value = "";
    onClear?.();
  }, [onClear]);

  return {
    inputRef,
    isLoading,
    isDraggingOver,
    acceptAttribute: accept?.join(",") ?? "",
    openDialog,
    clear,
    handlers: {
      onChange: handleInputChange,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
};

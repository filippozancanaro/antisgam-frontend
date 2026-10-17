import { useCallback } from "react";
import { ZIP_ACCEPT } from "@/features/scan/domain/instagramExport";
import { FilePicker } from "@/shared/components";
import { useToast } from "@/shared/ui";

interface Props {
  file: File | null;
  onFileSelected: (file: File) => Promise<void>;
  onClear: () => void;
}

const Uploader = ({ file, onFileSelected, onClear }: Props) => {
  const toast = useToast();

  const handleRejected = useCallback(
    () => toast("Il file selezionato non è uno zip", "error"),
    [toast],
  );

  return (
    <FilePicker
      label="File di dati da Instagram"
      accept={ZIP_ACCEPT}
      file={file}
      onFileSelected={onFileSelected}
      onRejected={handleRejected}
      onClear={onClear}
    />
  );
};

export default Uploader;

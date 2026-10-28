import { CheckCircle2, Download, RefreshCw, UploadCloud } from "lucide-react";
import { Button as AriaButton } from "react-aria-components";
import Button from "@/shared/ui/Button";
import Spinner from "@/shared/ui/Spinner";
import { cx } from "@/shared/utils/cx";
import styles from "./FilePicker.module.scss";
import { useFilePicker, type UseFilePickerOptions } from "./useFilePicker";

export interface FilePickerProps extends UseFilePickerOptions {
  label: string;
  /** File attualmente selezionato (controllato dal parent). */
  file: File | null;
}

/** Area di drop + selezione file, con stato di caricamento e file selezionato. */
const FilePicker = ({ label, file, ...options }: FilePickerProps) => {
  const { inputRef, isLoading, isDraggingOver, acceptAttribute, openDialog, clear, handlers } =
    useFilePicker(options);

  const isFileSelected = file !== null;

  return (
    <div className={styles.filePicker}>
      <div
        className={cx(styles.zone, isDraggingOver && styles.dragging, isFileSelected && styles.selected)}
        onDragOver={handlers.onDragOver}
        onDragLeave={handlers.onDragLeave}
        onDrop={handlers.onDrop}
      >
        {/* Niente aria-label: il nome accessibile viene dal contenuto, così
            include anche il file selezionato. */}
        <AriaButton className={styles.trigger} isDisabled={options.disabled} onPress={openDialog}>
          <span className={styles.icon}>
            {isLoading ? (
              <Spinner label="Caricamento" />
            ) : (
              <span aria-hidden="true">
                {isFileSelected ? (
                  <CheckCircle2 className={styles.iconSuccess} />
                ) : isDraggingOver ? (
                  <Download />
                ) : (
                  <UploadCloud />
                )}
              </span>
            )}
          </span>

          <span className={styles.title}>{label}</span>

          {isFileSelected ? (
            <span className={styles.fileName}>{file.name}</span>
          ) : (
            <span className={styles.hint}>Trascina lo zip qui oppure clicca per sceglierlo</span>
          )}
        </AriaButton>
      </div>

      <input
        type="file"
        hidden
        aria-label={`${label} (input)`}
        accept={acceptAttribute}
        disabled={options.disabled}
        ref={inputRef}
        onChange={handlers.onChange}
      />

      {isFileSelected && (
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" icon={<RefreshCw />} onPress={clear}>
            Pulisci selezione
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilePicker;

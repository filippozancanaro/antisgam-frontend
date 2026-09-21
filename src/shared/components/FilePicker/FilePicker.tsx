import { Box, Button, Card, CardContent, CircularProgress, Fade, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import styles from "./FilePicker.module.scss";
import { useFilePicker, type UseFilePickerOptions } from "./useFilePicker";

export interface FilePickerProps extends UseFilePickerOptions {
  label: string;
  /** File attualmente selezionato (controllato dal parent). */
  file: File | null;
}

const FilePicker = ({ label, file, ...options }: FilePickerProps) => {
  const { inputRef, isLoading, isDraggingOver, acceptAttribute, openDialog, clear, handlers } =
    useFilePicker(options);

  const isFileSelected = file !== null;

  return (
    <Box>
      <Card
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={openDialog}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openDialog();
          }
        }}
        onDragOver={handlers.onDragOver}
        onDragLeave={handlers.onDragLeave}
        onDrop={handlers.onDrop}
        sx={{
          cursor: options.disabled ? "default" : "pointer",
          bgcolor: isDraggingOver ? "primary.main" : "background.default",
          border: 2,
          borderStyle: "dashed",
          borderColor: isDraggingOver ? "primary.light" : "transparent",
          transition: "all 0.3s ease",
          "&:hover": { boxShadow: 3 },
        }}
      >
        <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
          <Box className={styles.iconarea}>
            <Typography variant="subtitle1" className={styles.title}>
              {label}
            </Typography>

            <Fade in={isLoading} unmountOnExit>
              <CircularProgress aria-label="Caricamento" />
            </Fade>

            <Fade in={!isLoading && !isFileSelected} unmountOnExit>
              <Box sx={{ textAlign: "center" }}>
                {isDraggingOver ? (
                  <SystemUpdateAltIcon fontSize="large" color="secondary" />
                ) : (
                  <UploadFileIcon fontSize="large" color="primary" />
                )}
              </Box>
            </Fade>

            <Fade in={!isLoading && isFileSelected} unmountOnExit>
              <Box sx={{ textAlign: "center" }}>
                <CheckCircleIcon fontSize="large" color="success" />
                <Typography variant="body2" className={styles.filelabel}>
                  {file?.name}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </CardContent>
      </Card>

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
        <Box className={styles.buttonarea}>
          <Button variant="text" startIcon={<RefreshIcon />} onClick={clear}>
            Pulisci selezione
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilePicker;

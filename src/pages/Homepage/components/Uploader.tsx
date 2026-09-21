import { Box, Grid, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { FilePicker } from "@/shared/components";
import { ZIP_ACCEPT } from "@/features/scan/domain/instagramExport";

interface Props {
  file: File | null;
  onFileSelected: (file: File) => Promise<void>;
  onClear: () => void;
}

const Uploader = ({ file, onFileSelected, onClear }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleRejected = useCallback(
    () => enqueueSnackbar("Il file selezionato non è uno zip", { variant: "error" }),
    [enqueueSnackbar],
  );

  return (
    <Grid size={{ xs: 12, md: 6, xl: 4 }} offset={{ md: 3, xl: 4 }}>
      <Box sx={{ bgcolor: "#e0f7fa", p: 2, textAlign: "center", borderRadius: 1 }}>
        <Typography variant="h6" sx={{ color: "common.black", pb: 1 }}>
          CARICA LO ZIP CON I TUOI DATI
        </Typography>
        <FilePicker
          label="File di dati da Instagram"
          accept={ZIP_ACCEPT}
          file={file}
          onFileSelected={onFileSelected}
          onRejected={handleRejected}
          onClear={onClear}
        />
      </Box>
    </Grid>
  );
};

export default Uploader;

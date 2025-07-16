import React, { useContext, useRef, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Fade,
  CircularProgress,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FilePickerContext } from './FilePickerContext';

const FilePicker: React.FC = () => {
  const context = useContext(FilePickerContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  if (!context) {
    throw new Error('FilePicker must be used within FilePickerProvider');
  }

  const {
    pageTitle,
    handleFile,
    cleanSelection,
    isFileSelected,
    getSelectedFile,
  } = context;

  const handleClick = () => inputRef.current?.click();

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setLoading(true);
      handleFileWithLoading(file);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      handleFileWithLoading(file);
    }
  };

  const handleFileWithLoading = async (file: File) => {
    await handleFile(file);
    setTimeout(() => {
      setLoading(false);
    }, 400); // breve delay per fluidità
  };

  const fileName = getSelectedFile()?.name ?? '';

  return (
    <Box>
      <Card
        sx={{
          bgcolor: '#f5f5f5',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s ease-in-out',
          '&:hover': { boxShadow: 3 },
        }}
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <CardContent>
          <Box
            sx={{
              minHeight: 150,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={1} sx={{color: 'common.black'}}>
              {pageTitle}
            </Typography>

            {/* 🌀 Spinner durante il caricamento */}
            <Fade in={loading} unmountOnExit>
              <CircularProgress />
            </Fade>

            {/* 📤 Upload icon (default) */}
            <Fade in={!loading && !isFileSelected} unmountOnExit>
              <UploadFileIcon fontSize="large" color="primary" />
            </Fade>

            {/* ✅ Check + file label */}
            <Fade in={!loading && isFileSelected} unmountOnExit>
              <Box textAlign="center">
                <CheckCircleIcon fontSize="large" color="success" />
                <Typography
                  variant="body2"
                  sx={{ mt: 1, wordBreak: 'break-word', maxWidth: 240, color: 'common.black' }}
                >
                  {fileName}
                </Typography>
              </Box>
            </Fade>
          </Box>
        </CardContent>
      </Card>

      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />

      {/* 🔄 Bottone "pulisci selezione" */}
      {isFileSelected && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Button variant="text" startIcon={<RefreshIcon />} onClick={cleanSelection}>
            Pulisci selezione
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilePicker;

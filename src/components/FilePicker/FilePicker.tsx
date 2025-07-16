import React, { useContext, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import RefreshIcon from '@mui/icons-material/Refresh';
import { FilePickerContext } from './FilePickerContext';

interface Props {
  pageTitle: string;
  acceptedFiles?: string[] | null;
  enabled: boolean;
  onUploadStarted?: (fileName: string) => void;
  onUploadCompleted?: (fileName: string, content: string) => void;
  onSelectionCleaned?: () => void;
}

const FilePicker: React.FC<Props> = ({
  pageTitle,
  acceptedFiles,
  enabled,
  onUploadStarted,
  onUploadCompleted,
  onSelectionCleaned,
}) => {
  const context = useContext(FilePickerContext);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!context) {
    throw new Error('FilePicker must be used within <FilePickerProvider>');
  }

  const { cleanSelection, isFileSelected } = context;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (file: File) => {
    if (!enabled) return;

    // Check accepted types
    if (
      acceptedFiles &&
      acceptedFiles.length > 0 &&
      !acceptedFiles.some((type) => file.type.includes(type))
    ) {
      return;
    }

    // a sort of event emitter, may be useful... probably
    if (onUploadStarted) onUploadStarted(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;

      if (onUploadCompleted) onUploadCompleted(file.name, content);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleClean = () => {
    cleanSelection();
    if (onSelectionCleaned) onSelectionCleaned();
  };

  return (
    <Box>
      <Card
        sx={{
          bgcolor: enabled ? '#f5f5f5' : '#eeeeee',
          cursor: enabled ? 'pointer' : 'not-allowed',
        }}
        onClick={enabled ? handleClick : undefined}
        onDragOver={(e) => e.preventDefault()}
        onDrop={enabled ? handleDrop : undefined}
      >
        <CardContent>
          <Box
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 150,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              {pageTitle}
            </Typography>
            <UploadFileIcon fontSize="large" color={enabled ? 'primary' : 'disabled'} />
          </Box>
        </CardContent>
      </Card>

      <input
        type="file"
        accept={acceptedFiles?.join(',')}
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
      />

      {isFileSelected === true && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Button
            variant="text"
            startIcon={<RefreshIcon />}
            onClick={handleClean}
          >
            Pulisci selezione
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilePicker;

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
import SystemUpdateAlt from '@mui/icons-material/SystemUpdateAlt';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FilePickerContext } from './FilePickerContext';
import lightStyles from './styles/FilePicker.light.module.scss';
import darkStyles from './styles/FilePicker.dark.module.scss';
import { useAtomValue } from 'jotai/react';
import { effectiveThemeAtom } from '../../store/atoms/theme-atoms';

const FilePicker: React.FC = () => {
  const themeSelection = useAtomValue(effectiveThemeAtom);
  const styles = themeSelection === 'dark' ? darkStyles : lightStyles;

  const context = useContext(FilePickerContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  if (!context) throw new Error('FilePicker must be used within FilePickerProvider');

  const {
    acceptedFiles,
    label,
    handleFile,
    cleanSelection,
    isFileSelected,
    getSelectedFile,
  } = context;

  const handleClick = () => inputRef.current?.click();
  const fileName = getSelectedFile()?.name ?? '';

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setLoading(true);
      handleFileWithLoading(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      handleFileWithLoading(file);
    }
  };

  const handleFileWithLoading = async (file: File) => {
    await handleFile(file);
    setTimeout(() => setLoading(false), 400);
  };

  const handleCleanSelection = () => {
    cleanSelection();
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getAcceptable = () => {
    if (acceptedFiles == null)
      return '';

    if (acceptedFiles?.length <= 0)
      return '';

    if (acceptedFiles?.length <= 1)
      return acceptedFiles[0];

    return acceptedFiles.join(',');
  }


  return (
    <Box>
      <Card
        className={styles.card}
        onClick={() => handleClick()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          // gestione file drag and drop
          handleDrop(e);
        }}
        sx={{
          cursor: 'pointer',
          bgcolor: isDraggingOver ? 'primary.main' : undefined,
          border: isDraggingOver ? '2px dashed primary.light' : '2px dashed transparent',
          transition: 'all 0.3s ease',
          '&:hover': { boxShadow: 3 },
        }}

      >
        <CardContent
          sx={{
            padding: 0,
            '&:last-child': {
              paddingBottom: 0,
            },
          }}>
          <Box sx={{ minHeight: 150, px: 2 }} className={styles.iconarea}>
            <Typography variant="subtitle1" className={styles.title}>
              {label}
            </Typography>

            <Fade in={loading} unmountOnExit>
              <CircularProgress />
            </Fade>

            <Fade in={!loading && !isFileSelected} unmountOnExit>
              {isDraggingOver === true ?
                <SystemUpdateAlt fontSize="large" color="secondary" /> :
                <UploadFileIcon fontSize="large" color="primary" />
              }
            </Fade>

            <Fade in={!loading && isFileSelected} unmountOnExit>
              <Box textAlign="center">
                <CheckCircleIcon fontSize="large" color="success" />
                <Typography variant="body2" className={styles.filelabel}>
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
        accept={getAcceptable()}
        ref={inputRef}
        onChange={(e) => handleFileChange(e)}
      />

      {isFileSelected && (
        <Box className={styles.buttonarea}>
          <Button variant="text" startIcon={<RefreshIcon />} onClick={() => handleCleanSelection()}>
            Pulisci selezione
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default FilePicker;

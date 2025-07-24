import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { FilePickerContext, type FilePickerContextProps } from './FilePickerContext';

interface Props {
  children: ReactNode;
  acceptedFiles?: string[] | null;
  label: string;
  enabled: boolean;
  onUploadStarted?: (fileName: string) => void;
  onUploadCompleted?: (fileName: string, content: File) => void;
  onSelectionCleaned?: () => void;
}

const FilePickerProvider: React.FC<Props> = ({
  children,
  acceptedFiles,
  label,
  enabled,
  onUploadStarted,
  onUploadCompleted,
  onSelectionCleaned,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<File | null>(null);

  const isFileSelected = Boolean(fileName && fileContent);

  const getSelectedFile = useCallback(() => {
    return fileName && fileContent ? { name: fileName, content: fileContent } : null;
  }, [fileName, fileContent]);

  const cleanSelection = useCallback(() => {
    setFileName(null);
    setFileContent(null);
    if (onSelectionCleaned) onSelectionCleaned();
  }, [onSelectionCleaned]);
  
  const handleFile = (file: File) => {
    if (!enabled || !file) return;

    // Verifica tipo accettato
    if (
      acceptedFiles &&
      acceptedFiles.length > 0 &&
      !acceptedFiles.some((type) => file.type.includes(type))
    ) {
      return;
    }

    if (onUploadStarted) onUploadStarted(file.name);

    // Nessuna lettura: passiamo direttamente il file
    setFileName(file.name);
    setFileContent(file);

    if (onUploadCompleted) onUploadCompleted(file.name, file);
  };


  const contextValue: FilePickerContextProps = {
    label,
    handleFile,
    getSelectedFile,
    cleanSelection,
    isFileSelected,
    acceptedFiles
  };

  return (
    <FilePickerContext.Provider value={contextValue}>
      {children}
    </FilePickerContext.Provider>
  );
};

export default FilePickerProvider;

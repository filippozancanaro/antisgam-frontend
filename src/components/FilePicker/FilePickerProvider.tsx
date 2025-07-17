import React, { useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { FilePickerContext, type FilePickerContextProps } from './FilePickerContext';

interface Props {
  children: ReactNode;
  acceptedFiles?: string[] | null;
  pageTitle: string;
  enabled: boolean;
  onUploadStarted?: (fileName: string) => void;
  onUploadCompleted?: (fileName: string, content: string) => void;
  onSelectionCleaned?: () => void;
}

const FilePickerProvider: React.FC<Props> = ({
  children,
  acceptedFiles,
  pageTitle,
  enabled,
  onUploadStarted,
  onUploadCompleted,
  onSelectionCleaned,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);

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

    if (
      acceptedFiles &&
      acceptedFiles.length > 0 &&
      !acceptedFiles.some((type) => file.type.includes(type))
    ) {
      return;
    }

    if (onUploadStarted) onUploadStarted(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      setFileName(file.name);
      setFileContent(content);
      if (onUploadCompleted) onUploadCompleted(file.name, content);
    };
    reader.readAsText(file);
  };

  const contextValue: FilePickerContextProps = {
    pageTitle,
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

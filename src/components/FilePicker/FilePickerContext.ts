import { createContext } from 'react';

export interface FilePickerContextProps {
  pageTitle: string;
  handleFile: (file: File) => void;
  getSelectedFile: () => { name: string; content: File } | null;
  cleanSelection: () => void;
  isFileSelected: boolean;
  acceptedFiles?: string[] | null;
}

export const FilePickerContext = createContext<FilePickerContextProps | null>(null);

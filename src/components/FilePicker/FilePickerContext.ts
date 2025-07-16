import { createContext } from 'react';

export interface FilePickerContextProps {
  pageTitle: string;
  handleFile: (file: File) => void;
  getSelectedFile: () => { name: string; content: string } | null;
  cleanSelection: () => void;
  isFileSelected: boolean;
}

export const FilePickerContext = createContext<FilePickerContextProps | null>(null);

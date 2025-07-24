import React from 'react';
import FilePickerProvider from './FilePickerProvider';
import FilePicker from './FilePicker';

interface Props {
  acceptedFiles?: string[] | null;
  label: string;
  enabled: boolean;
  onUploadStarted?: (fileName: string) => void;
  onUploadCompleted?: (fileName: string, content: File) => void;
  onSelectionCleaned?: () => void;
}

const ExportedFilePicker: React.FC<Props> = (props) => {
  return (
    <FilePickerProvider {...props}>
      <FilePicker />
    </FilePickerProvider>
  );
};

export default ExportedFilePicker;

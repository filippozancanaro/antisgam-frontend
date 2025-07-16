import React from 'react';
import FilePickerProvider from './FilePickerProvider';
import FilePicker from './FilePicker';

interface Props {
  acceptedFiles?: string[] | null;
  pageTitle: string;
  enabled: boolean;
  onUploadStarted?: (fileName: string) => void;
  onUploadCompleted?: (fileName: string, content: string) => void;
  onSelectionCleaned?: () => void;
}

const ExportedFilePicker: React.FC<Props> = (props) => {
  return (
    <FilePickerProvider {...props}>
      <FilePicker {...props} />
    </FilePickerProvider>
  );
};

export default ExportedFilePicker;

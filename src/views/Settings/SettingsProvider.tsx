import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setUserThemePreference, type UserThemeMode } from '../../theme/store/theme-slice';
import { useNavigate } from 'react-router-dom';
import { setEnableJsonFiles } from '../../shared/uploader-json/uploader-json-slice';

interface Props {
  children: ReactNode;
}

const SettingsProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enableJsonFiles = useSelector((state: RootState) => state.uploaderJson.enableJsonFiles);
  const userThemeChoice = useSelector((state: RootState) => state.theme.userchoice);

  const [themeForm, setThemeForm] = useState<UserThemeMode>(userThemeChoice);
  const [enableJsonFilesForm, setEnableJsonFilesForm] = useState<boolean>(enableJsonFiles);

  const updateTheme = (value: UserThemeMode) => {
    setThemeForm(value);
  };

  const updateEnableJsonFiles = (value: boolean) => {
    setEnableJsonFilesForm(value);
  };

  const saveChanges = () => {
    dispatch(setUserThemePreference(themeForm as UserThemeMode));
    dispatch(setEnableJsonFiles(enableJsonFilesForm as boolean));

    navigate('/');
  };

  const discardChanges = () => {
    setThemeForm(userThemeChoice);
    setEnableJsonFilesForm(enableJsonFiles);

    navigate('/');
  };

  return (
    <SettingsContext.Provider
      value={{
        themeForm,
        enableJsonFilesForm,

        updateTheme,
        updateEnableJsonFiles,
        saveChanges,
        discardChanges
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

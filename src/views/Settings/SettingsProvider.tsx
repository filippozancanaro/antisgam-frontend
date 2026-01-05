import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { SettingsContext } from './SettingsContext';
import { useNavigate } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai/react';
import { setThemeAtom, userThemeChoiceAtom, type UserThemeMode } from '../../store/atoms/theme-atoms';

interface Props {
  children: ReactNode;
}

const SettingsProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  const userThemeChoice = useAtomValue(userThemeChoiceAtom);
  const setTheme = useSetAtom(setThemeAtom);

  const [themeForm, setThemeForm] = useState<UserThemeMode>(userThemeChoice);

  const updateTheme = (value: UserThemeMode) => {
    setThemeForm(value);
  };

  const saveChanges = () => {
    setTheme(themeForm);

    navigate('/');
  };

  const discardChanges = () => {
    setThemeForm(userThemeChoice);

    navigate('/');
  };

  return (
    <SettingsContext.Provider
      value={{
        themeForm,

        updateTheme,
        saveChanges,
        discardChanges
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;

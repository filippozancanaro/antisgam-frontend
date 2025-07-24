import React from 'react';
import type { ReactNode } from 'react';
import { ResultsContext } from './ResultsContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useGlobalCleanup } from '../../shared/antisgam-cleanup/AntisgamCleanup';

interface Props {
  children: ReactNode;
}

const ResultsProvider: React.FC<Props> = ({ children }) => {
  const unfollowers = useSelector((state: RootState) => state.antisgam.unfollowersData);
  const cleanup = useGlobalCleanup();

  const copyToClipboard = () => {
    if (!unfollowers || unfollowers.length === 0) return;
    const text = unfollowers.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copiato negli appunti!');
    });
  };

  const restart = () => {
    cleanup();
  };

  return (
    <ResultsContext.Provider
      value={{
        unfollowers,
        copyToClipboard,
        restart
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsProvider;

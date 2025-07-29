import React from 'react';
import type { ReactNode } from 'react';
import { ResultsContext } from './ResultsContext';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useGlobalCleanup } from '../../shared/antisgam-cleanup/AntisgamCleanup';
import { useSnackbar } from 'notistack';

interface Props {
  children: ReactNode;
}

const ResultsProvider: React.FC<Props> = ({ children }) => {
  const unfollowers = useSelector((state: RootState) => state.antisgam.unfollowersData);
  const pendingRequests = useSelector((state: RootState) => state.antisgam.pendingRequests);
  const removedSuggestions = useSelector((state: RootState) => state.antisgam.removedSuggestions);
  const cleanup = useGlobalCleanup();
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = (what: 'unfollowers' | 'pending' | 'suggestions') => {

    let text: string = '';

    if (what === 'unfollowers') {
      if (!unfollowers || unfollowers?.length === 0)
        return;

      text = unfollowers.join('\n');
    }

    if (what === 'pending') {
      if (!pendingRequests || pendingRequests?.length === 0)
        return;

      text = pendingRequests.join('\n');
    }

    if (what === 'suggestions') {
      if (!removedSuggestions || removedSuggestions?.length === 0)
        return;

      text = removedSuggestions.join('\n');
    }

    if (text == null || text === '')
      return;

    navigator.clipboard.writeText(text).then(() => {
      enqueueSnackbar('Testo copiato negli appunti', { variant: 'info' });
      // console.log('Copiato negli appunti!');
    });
  };

  const restart = () => {
    cleanup();
  };

  return (
    <ResultsContext.Provider
      value={{
        unfollowers,
        pendingRequests,
        removedSuggestions,
        copyToClipboard,
        restart
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsProvider;

import React, { useCallback } from 'react';
import type { ReactNode } from 'react';
import { ResultsContext } from './ResultsContext';
import { useSelector, useDispatch } from 'react-redux';
import { resetAntisgam } from '../../shared/antisgam-core-state/antisgam-slice';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../store/store';

interface Props {
  children: ReactNode;
}

const ResultsProvider: React.FC<Props> = ({ children }) => {
  const unfollowers = useSelector((state: RootState) => state.antisgam.unfollowersData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const copyToClipboard = useCallback(() => {
    if (!unfollowers || unfollowers.length === 0) return;
    const text = unfollowers.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      console.log('Copiato negli appunti!');
    });
  }, [unfollowers]);

  const restart = useCallback(() => {
    dispatch(resetAntisgam());
    console.log('Restart triggered');
    navigate('/');
  }, [dispatch, navigate]);

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

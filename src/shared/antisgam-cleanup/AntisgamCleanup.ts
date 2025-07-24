import { useDispatch } from 'react-redux';
import { resetAntisgam } from '../antisgam-core-state/antisgam-slice';
import { useNavigate } from 'react-router-dom';

export const useGlobalCleanup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return () => {
    dispatch(resetAntisgam());
    console.log('[Cleanup] Stato antisgam azzerato');

    navigate('/');
  };
};

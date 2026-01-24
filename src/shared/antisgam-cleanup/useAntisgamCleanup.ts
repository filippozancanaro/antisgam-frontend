import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai/react";
import { cleanupLastScanAtom } from "../../store/atoms/antisgam-atoms";

export const useGlobalCleanup = () => {
  const navigate = useNavigate();
  const cleanup = useSetAtom(cleanupLastScanAtom);
  
  return () => {
    cleanup();
    // console.log('[Cleanup] Stato antisgam azzerato');

    navigate("/");
  };
};

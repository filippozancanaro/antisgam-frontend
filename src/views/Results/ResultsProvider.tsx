import React, { useState } from "react";
import type { ReactNode } from "react";
import { ResultsContext } from "./ResultsContext";
import { useSnackbar } from "notistack";
import { useAtomValue } from "jotai/react";
import { getLastScanAtom } from "../../store/atoms/antisgam-atoms";
import { useGlobalCleanup } from "../../shared/antisgam-cleanup/useAntisgamCleanup";

interface Props {
  children: ReactNode;
}

const ResultsProvider: React.FC<Props> = ({ children }) => {
  const lastScan = useAtomValue(getLastScanAtom);

  const [unfollowers] = useState<string[]>(lastScan.unfollowersData);
  const [pendingRequests] = useState<string[]>(lastScan.pendingRequests);
  const [removedSuggestions] = useState<string[]>(lastScan.removedSuggestions);

  const cleanup = useGlobalCleanup();
  const { enqueueSnackbar } = useSnackbar();

  const copyToClipboard = (what: "unfollowers" | "pending" | "suggestions") => {
    let text: string = "";

    if (what === "unfollowers") {
      if (!unfollowers || unfollowers?.length === 0) return;

      text = unfollowers.join("\n");
    }

    if (what === "pending") {
      if (!pendingRequests || pendingRequests?.length === 0) return;

      text = pendingRequests.join("\n");
    }

    if (what === "suggestions") {
      if (!removedSuggestions || removedSuggestions?.length === 0) return;

      text = removedSuggestions.join("\n");
    }

    if (text == null || text === "") return;

    navigator.clipboard.writeText(text).then(() => {
      enqueueSnackbar("Testo copiato negli appunti", { variant: "info" });
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
        restart,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};

export default ResultsProvider;

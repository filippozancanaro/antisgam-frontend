import { useRotatingIndex, useTimeout } from "@/shared/hooks";
import { Card, LoadingOverlay, Spinner } from "@/shared/ui";
import { LOADING_MIN_DURATION_MS, LOADING_TIP_INTERVAL_MS, LOADING_TIPS } from "./loadingTips";
import styles from "./AnalysisOverlay.module.scss";

interface ContentProps {
  onDone: () => void;
}

/**
 * L'analisi è già stata eseguita e salvata quando questo contenuto viene montato:
 * resta visibile il tempo minimo (puro effetto scenico) e poi avvisa il parent.
 */
const AnalysisContent = ({ onDone }: ContentProps) => {
  const tipIndex = useRotatingIndex(LOADING_TIPS.length, LOADING_TIP_INTERVAL_MS);
  useTimeout(onDone, LOADING_MIN_DURATION_MS);

  return (
    <>
      <img className={styles.image} src="/assets/images/loading.svg" alt="" />
      <Spinner label="Analisi in corso" size="lg" />
      <Card className={styles.tip}>{LOADING_TIPS[tipIndex]}</Card>
    </>
  );
};

export interface AnalysisOverlayProps {
  open: boolean;
  /** Chiamata quando il tempo minimo di attesa è trascorso. */
  onDone: () => void;
}

/** Schermata di analisi: compare sopra all'app, senza cambiare rotta. */
const AnalysisOverlay = ({ open, onDone }: AnalysisOverlayProps) => (
  <LoadingOverlay open={open} label="Analisi in corso">
    {open && <AnalysisContent onDone={onDone} />}
  </LoadingOverlay>
);

export default AnalysisOverlay;

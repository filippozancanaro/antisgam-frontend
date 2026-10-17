import { ProgressBar } from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import styles from "./Spinner.module.scss";

export interface SpinnerProps {
  /** Descrizione per gli screen reader. */
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Indicatore di caricamento indeterminato (role="progressbar" via React Aria). */
const Spinner = ({ label, size = "md", className }: SpinnerProps) => (
  <ProgressBar isIndeterminate aria-label={label} className={cx(styles.spinner, styles[size], className)}>
    <span className={styles.ring} />
  </ProgressBar>
);

export default Spinner;

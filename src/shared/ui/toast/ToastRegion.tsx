import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import IconButton from "../IconButton";
import { useTimeout } from "@/shared/hooks/useTimeout";
import { cx } from "@/shared/utils/cx";
import { dismissToastAtom, toastsAtom, TOAST_DURATION_MS, type ToastItem } from "./toastAtoms";
import styles from "./ToastRegion.module.scss";

const ICONS: Record<ToastItem["variant"], ReactNode> = {
  info: <Info aria-hidden="true" />,
  success: <CheckCircle2 aria-hidden="true" />,
  warning: <AlertTriangle aria-hidden="true" />,
  error: <XCircle aria-hidden="true" />,
};

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const Toast = ({ toast, onDismiss }: ToastProps) => {
  useTimeout(() => onDismiss(toast.id), TOAST_DURATION_MS);

  return (
    <div className={cx(styles.toast, styles[toast.variant])} role="status">
      <span className={styles.icon}>{ICONS[toast.variant]}</span>
      <p className={styles.message}>{toast.message}</p>
      <IconButton aria-label="Chiudi notifica" size="sm" onPress={() => onDismiss(toast.id)}>
        <X aria-hidden="true" />
      </IconButton>
    </div>
  );
};

/** Area dei messaggi temporanei: va montata una sola volta, a livello di app. */
const ToastRegion = () => {
  const toasts = useAtomValue(toastsAtom);
  const dismiss = useSetAtom(dismissToastAtom);

  // Il contenitore resta sempre montato: una live region creata insieme al suo
  // contenuto viene annunciata in modo inaffidabile dagli screen reader.
  return (
    <div className={styles.region} aria-live="polite" aria-label="Notifiche">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
};

export default ToastRegion;

import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import IconButton from "../IconButton";
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
  // Due stati distinti: se fossero uno solo, uscire col mouse farebbe ripartire
  // il countdown anche con il focus ancora dentro al toast.
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const isPaused = isHovered || hasFocus;

  // Il countdown si ferma finché il toast è sotto il puntatore o ha il focus:
  // altrimenti sparisce mentre lo si legge o si sta per premere "Chiudi".
  useEffect(() => {
    if (isPaused) return;

    const timer = setTimeout(() => onDismiss(toast.id), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isPaused, onDismiss, toast.id]);

  return (
    <div
      className={cx(styles.toast, styles[toast.variant])}
      role="status"
      // Su touch il tap genera un "enter" senza il corrispondente "leave":
      // metterebbe in pausa per sempre, quindi mettiamo in pausa solo il puntatore vero.
      onPointerEnter={(event) => setIsHovered(event.pointerType !== "touch")}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setHasFocus(true)}
      onBlur={() => setHasFocus(false)}
    >
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

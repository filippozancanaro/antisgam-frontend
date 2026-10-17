import type { ReactNode } from "react";
import { Dialog as AriaDialog, Modal, ModalOverlay } from "react-aria-components";
import styles from "./LoadingOverlay.module.scss";

export interface LoadingOverlayProps {
  open: boolean;
  /** Etichetta del pannello per gli screen reader. */
  label: string;
  children: ReactNode;
}

/**
 * Livello a comparsa che copre l'app durante un'operazione bloccante.
 * Non è chiudibile dall'utente: sparisce quando chi lo mostra ha finito.
 */
const LoadingOverlay = ({ open, label, children }: LoadingOverlayProps) => (
  <ModalOverlay isOpen={open} isDismissable={false} isKeyboardDismissDisabled className={styles.overlay}>
    <Modal className={styles.modal}>
      <AriaDialog aria-label={label} className={styles.dialog}>
        {children}
      </AriaDialog>
    </Modal>
  </ModalOverlay>
);

export default LoadingOverlay;

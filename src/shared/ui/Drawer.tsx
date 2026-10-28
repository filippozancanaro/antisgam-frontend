import type { ReactNode } from "react";
import { Dialog as AriaDialog, Modal, ModalOverlay } from "react-aria-components";
import styles from "./Drawer.module.scss";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Etichetta del pannello per gli screen reader. */
  label: string;
  children: ReactNode;
}

/** Pannello laterale a scomparsa (usato per il menu sui schermi stretti). */
const Drawer = ({ open, onClose, label, children }: DrawerProps) => (
  <ModalOverlay
    isOpen={open}
    onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}
    isDismissable
    className={styles.overlay}
  >
    <Modal className={styles.panel}>
      <AriaDialog aria-label={label} className={styles.dialog}>
        {children}
      </AriaDialog>
    </Modal>
  </ModalOverlay>
);

export default Drawer;

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { Dialog as AriaDialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import IconButton from "./IconButton";
import styles from "./Dialog.module.scss";

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  /** Larghezza massima del pannello. */
  size?: "md" | "lg" | "xl";
  /** Barra in fondo, tipicamente con i bottoni di conferma. */
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * Finestra modale del design system: React Aria gestisce focus trap,
 * chiusura con Esc/click esterno e aria-labelledby sul titolo.
 * Sotto i 640px occupa tutto lo schermo.
 */
const Dialog = ({ open, onClose, title, size = "lg", footer, children, className }: DialogProps) => (
  <ModalOverlay
    isOpen={open}
    onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}
    isDismissable
    className={styles.overlay}
  >
    <Modal className={cx(styles.modal, styles[size], className)}>
      <AriaDialog className={styles.dialog}>
        <header className={styles.header}>
          <Heading slot="title" className={styles.title}>
            {title}
          </Heading>
          <IconButton aria-label="Chiudi" onPress={onClose}>
            <X aria-hidden="true" />
          </IconButton>
        </header>

        <div className={styles.body}>{children}</div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </AriaDialog>
    </Modal>
  </ModalOverlay>
);

export default Dialog;

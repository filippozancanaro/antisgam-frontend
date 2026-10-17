import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./Page.module.scss";

export interface PageProps {
  /** Etichetta piccola sopra al titolo. */
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Contenuto allineato a destra nell'intestazione (bottoni, ...). */
  actions?: ReactNode;
  /** Centra il contenuto in colonna stretta (404, stati vuoti). */
  centered?: boolean;
  children?: ReactNode;
  className?: string;
}

/** Contenitore standard delle pagine: intestazione + colonna di contenuto a larghezza massima. */
const Page = ({ eyebrow, title, description, actions, centered = false, children, className }: PageProps) => (
  <div className={cx(styles.page, centered && styles.centered, className)}>
    {(eyebrow || title || description || actions) && (
      <header className={styles.header}>
        <div className={styles.headings}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {title && <h1 className={styles.title}>{title}</h1>}
          {description && <div className={styles.description}>{description}</div>}
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
    )}
    {children}
  </div>
);

export default Page;

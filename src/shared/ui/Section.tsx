import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./Section.module.scss";

export interface SectionProps {
  /** Numero/etichetta dello step, mostrato in un cerchio a sinistra del titolo. */
  step?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Icona decorativa accanto al titolo. */
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Blocco di contenuto di una pagina: superficie con intestazione opzionale. */
const Section = ({ step, title, description, icon, children, className }: SectionProps) => (
  <section className={cx(styles.section, className)}>
    {(title || description) && (
      <div className={styles.header}>
        {step !== undefined && <span className={styles.step}>{step}</span>}
        <div className={styles.headings}>
          {title && (
            <h2 className={styles.title}>
              {title}
              {icon && (
                <span className={styles.icon} aria-hidden="true">
                  {icon}
                </span>
              )}
            </h2>
          )}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    )}
    {children}
  </section>
);

export default Section;

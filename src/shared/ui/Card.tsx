import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./Card.module.scss";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Intestazione opzionale, sopra al contenuto. */
  title?: ReactNode;
  /** Evidenzia la card con il colore di accento. */
  highlight?: boolean;
  children?: ReactNode;
}

/** Superficie di base del design system. */
const Card = ({ title, highlight = false, className, children, ...props }: CardProps) => (
  <div {...props} className={cx(styles.card, highlight && styles.highlight, className)}>
    {title !== undefined && <h3 className={styles.title}>{title}</h3>}
    {children}
  </div>
);

export default Card;

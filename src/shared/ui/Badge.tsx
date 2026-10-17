import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./Badge.module.scss";

export type BadgeTone = "neutral" | "accent" | "success" | "danger" | "warning" | "info";

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

/** Etichetta compatta per conteggi e stati. */
const Badge = ({ tone = "neutral", children, className }: BadgeProps) => (
  <span className={cx(styles.badge, styles[tone], className)}>{children}</span>
);

export default Badge;

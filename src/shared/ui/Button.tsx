import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Occupa tutta la larghezza disponibile. */
  fullWidth?: boolean;
  /** Icona a sinistra del testo (decorativa). */
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/** Bottone del design system, costruito su React Aria (gestisce press, focus e tastiera). */
const Button = ({
  variant = "secondary",
  size = "md",
  fullWidth = false,
  icon,
  children,
  className,
  ...props
}: ButtonProps) => (
  <AriaButton
    {...props}
    className={cx(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className)}
  >
    {icon && (
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    )}
    {children}
  </AriaButton>
);

export default Button;

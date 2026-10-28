import type { ReactNode } from "react";
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends Omit<AriaButtonProps, "className" | "children"> {
  /** Obbligatoria: il bottone non ha testo visibile. */
  "aria-label": string;
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}

/** Bottone quadrato con la sola icona. */
const IconButton = ({ children, size = "md", className, ...props }: IconButtonProps) => (
  <AriaButton {...props} className={cx(styles.iconButton, styles[size], className)}>
    {children}
  </AriaButton>
);

export default IconButton;

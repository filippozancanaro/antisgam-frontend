import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import styles from "./Accordion.module.scss";

export interface AccordionItemProps {
  /** Identificativo usato dal gruppo per sapere quali pannelli sono aperti. */
  id: string;
  title: ReactNode;
  children: ReactNode;
}

/** Singola voce espandibile: va usata dentro ad `Accordion`. */
export const AccordionItem = ({ id, title, children }: AccordionItemProps) => (
  <Disclosure id={id} className={styles.item}>
    <Heading className={styles.heading}>
      <AriaButton slot="trigger" className={styles.trigger}>
        <span className={styles.title}>{title}</span>
        <ChevronDown className={styles.chevron} aria-hidden="true" />
      </AriaButton>
    </Heading>
    <DisclosurePanel className={styles.panel}>{children}</DisclosurePanel>
  </Disclosure>
);

export interface AccordionProps {
  children: ReactNode;
  /** Permette di tenere aperte più voci contemporaneamente. */
  allowsMultipleExpanded?: boolean;
  className?: string;
}

/** Gruppo di sezioni espandibili. */
const Accordion = ({ children, allowsMultipleExpanded = true, className }: AccordionProps) => (
  <DisclosureGroup allowsMultipleExpanded={allowsMultipleExpanded} className={cx(styles.group, className)}>
    {children}
  </DisclosureGroup>
);

export default Accordion;

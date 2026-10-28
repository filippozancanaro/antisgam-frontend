import type { ReactNode } from "react";
import { Label, Radio, RadioGroup as AriaRadioGroup } from "react-aria-components";
import { cx } from "@/shared/utils/cx";
import styles from "./RadioGroup.module.scss";

export interface RadioOption<T extends string> {
  value: T;
  label: string;
  /** Icona decorativa mostrata sopra l'etichetta. */
  icon?: ReactNode;
}

export interface RadioGroupProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<RadioOption<T>>;
  className?: string;
}

/** Gruppo di scelte esclusive, reso come controllo segmentato. */
const RadioGroup = <T extends string>({ label, value, onChange, options, className }: RadioGroupProps<T>) => (
  <AriaRadioGroup
    value={value}
    onChange={(next) => onChange(next as T)}
    className={cx(styles.group, className)}
  >
    <Label className={styles.label}>{label}</Label>
    <div className={styles.options}>
      {options.map((option) => (
        <Radio key={option.value} value={option.value} className={styles.option}>
          {option.icon && (
            <span className={styles.icon} aria-hidden="true">
              {option.icon}
            </span>
          )}
          {option.label}
        </Radio>
      ))}
    </div>
  </AriaRadioGroup>
);

export default RadioGroup;

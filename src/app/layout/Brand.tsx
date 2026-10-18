import { cx } from "@/shared/utils/cx";
import styles from "./Brand.module.scss";

interface Props {
  /** Versione ridotta per la barra superiore su mobile. */
  compact?: boolean;
  className?: string;
}

/** Logo + nome dell'app. */
const Brand = ({ compact = false, className }: Props) => (
  <span className={cx(styles.brand, compact && styles.compact, className)}>
    {/* logo_mark.webp è la versione 192px del logo: l'originale è un PNG 2828px da 1,9 MB. */}
    <img className={styles.logo} src="/assets/logo/logo_mark.webp" alt="" width={40} height={40} />
    <span className={styles.word}>ANTISGAM</span>
  </span>
);

export default Brand;

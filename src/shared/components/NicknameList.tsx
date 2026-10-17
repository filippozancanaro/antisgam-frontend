import { AtSign } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./NicknameList.module.scss";

interface Props {
  nicknames: readonly string[];
  /** Mostrato al posto della lista quando non ci sono nickname. */
  emptyContent: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/** Lista scrollabile di nickname con stato vuoto personalizzabile. */
const NicknameList = ({ nicknames, emptyContent, className, "aria-label": ariaLabel }: Props) => (
  <div className={cx(styles.wrapper, className)}>
    {nicknames.length > 0 ? (
      <ul className={styles.list} aria-label={ariaLabel}>
        {nicknames.map((nickname) => (
          <li key={nickname} className={styles.item}>
            <AtSign className={styles.icon} aria-hidden="true" />
            {nickname}
          </li>
        ))}
      </ul>
    ) : (
      emptyContent
    )}
  </div>
);

export default NicknameList;

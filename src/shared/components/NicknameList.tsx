import { AtSign } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./NicknameList.module.scss";

interface Props {
  nicknames: readonly string[];
  /** Mostrato al posto della lista quando non ci sono nickname. */
  emptyContent: ReactNode;
  /** Nickname da evidenziare (es. comparsi solo nell'ultima scansione). */
  highlighted?: ReadonlySet<string>;
  className?: string;
  "aria-label"?: string;
}

/** Lista scrollabile di nickname con stato vuoto personalizzabile. */
const NicknameList = ({ nicknames, emptyContent, highlighted, className, "aria-label": ariaLabel }: Props) => (
  <div className={cx(styles.wrapper, className)}>
    {nicknames.length > 0 ? (
      // `role` esplicito: con `list-style: none` Safari toglie la semantica di lista.
      <ul role="list" className={styles.list} aria-label={ariaLabel}>
        {nicknames.map((nickname) => {
          const isNew = highlighted?.has(nickname) ?? false;
          return (
            <li
              key={nickname}
              className={cx(styles.item, isNew && styles.itemHighlighted)}
              data-new={isNew ? "true" : undefined}
              // Il bordo da solo non arriva agli screen reader (né a chi non distingue i colori).
              aria-label={isNew ? `${nickname} (nuovo)` : undefined}
            >
              <AtSign className={styles.icon} aria-hidden="true" />
              {nickname}
            </li>
          );
        })}
      </ul>
    ) : (
      emptyContent
    )}
  </div>
);

export default NicknameList;

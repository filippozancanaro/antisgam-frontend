import { History } from "lucide-react";
import { useId } from "react";
import { NavLink } from "react-router-dom";
import { useScanHistory } from "@/features/scan/hooks/useScanHistory";
import { Badge } from "@/shared/ui";
import { cx } from "@/shared/utils/cx";
import { formatScanDate } from "@/shared/utils/formatDate";
import styles from "./ScanHistoryList.module.scss";

interface Props {
  onNavigate?: () => void;
  className?: string;
}

const unfollowersLabel = (count: number) =>
  count === 1 ? "1 non ti segue" : `${count} non ti seguono`;

/**
 * Lista scrollabile delle ultime scansioni salvate.
 * Sono link veri: ogni scansione ha il suo url, quindi si può aprire in una
 * nuova scheda, e `NavLink` marca da sé quella corrente con `aria-current`.
 */
const ScanHistoryList = ({ onNavigate, className }: Props) => {
  const history = useScanHistory();
  const headingId = useId();

  return (
    <div className={cx(styles.wrapper, className)}>
      <h2 id={headingId} className={styles.heading}>
        Ultime scansioni
      </h2>

      {history.length === 0 ? (
        <p className={styles.empty}>Nessuna scansione salvata</p>
      ) : (
        // `role` esplicito: con `list-style: none` Safari toglie la semantica di lista.
        <ul role="list" className={styles.list} aria-labelledby={headingId}>
          {history.map((record) => (
            <li key={record.id}>
              <NavLink
                to={`/results/${record.id}`}
                onClick={onNavigate}
                className={({ isActive }) => cx(styles.item, isActive && styles.itemSelected)}
              >
                <span className={styles.date}>
                  <History className={styles.icon} aria-hidden="true" />
                  {formatScanDate(record.timestamp)}
                </span>
                <Badge tone={record.data.unfollowers.length > 0 ? "accent" : "success"}>
                  {unfollowersLabel(record.data.unfollowers.length)}
                </Badge>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScanHistoryList;

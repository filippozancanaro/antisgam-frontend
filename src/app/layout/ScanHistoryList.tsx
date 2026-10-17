import { History } from "lucide-react";
import { useMatch, useNavigate } from "react-router-dom";
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

/** Lista scrollabile delle ultime scansioni salvate: un click apre i relativi risultati. */
const ScanHistoryList = ({ onNavigate, className }: Props) => {
  const navigate = useNavigate();
  const history = useScanHistory();
  const match = useMatch("/results/:scanId");
  const selectedId = match?.params.scanId;

  return (
    <div className={cx(styles.wrapper, className)}>
      <h2 className={styles.heading}>Ultime scansioni</h2>

      {history.length === 0 ? (
        <p className={styles.empty}>Nessuna scansione salvata</p>
      ) : (
        <ul className={styles.list} aria-label="Ultime scansioni">
          {history.map((record) => {
            const isSelected = record.id === selectedId;

            return (
              <li key={record.id}>
                <button
                  type="button"
                  aria-current={isSelected ? "page" : undefined}
                  className={cx(styles.item, isSelected && styles.itemSelected)}
                  onClick={() => {
                    onNavigate?.();
                    navigate(`/results/${record.id}`);
                  }}
                >
                  <span className={styles.date}>
                    <History className={styles.icon} aria-hidden="true" />
                    {formatScanDate(record.timestamp)}
                  </span>
                  <Badge tone={record.data.unfollowers.length > 0 ? "accent" : "success"}>
                    {unfollowersLabel(record.data.unfollowers.length)}
                  </Badge>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ScanHistoryList;

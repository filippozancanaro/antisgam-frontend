import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { useMatch, useNavigate } from "react-router-dom";
import { useScanHistory } from "@/features/scan/hooks/useScanHistory";
import { formatScanDate } from "@/shared/utils/formatDate";

interface Props {
  onNavigate?: () => void;
  maxHeight?: number | string;
}

const unfollowersLabel = (count: number) =>
  count === 1 ? "1 non ti segue" : `${count} non ti seguono`;

/** Lista scrollabile delle ultime scansioni salvate: un click apre i relativi risultati. */
const ScanHistoryList = ({ onNavigate, maxHeight = 320 }: Props) => {
  const navigate = useNavigate();
  const history = useScanHistory();
  const match = useMatch("/results/:scanId");
  const selectedId = match?.params.scanId;

  return (
    <List
      dense
      aria-label="Ultime scansioni"
      subheader={<ListSubheader disableSticky>Ultime scansioni</ListSubheader>}
      sx={{ maxHeight, overflowY: "auto" }}
    >
      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1 }}>
          Nessuna scansione salvata
        </Typography>
      ) : (
        history.map((record) => (
          <ListItemButton
            key={record.id}
            selected={record.id === selectedId}
            onClick={() => {
              onNavigate?.();
              navigate(`/results/${record.id}`);
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <HistoryIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={formatScanDate(record.timestamp)}
              secondary={unfollowersLabel(record.data.unfollowers.length)}
            />
          </ListItemButton>
        ))
      )}
    </List>
  );
};

export default ScanHistoryList;

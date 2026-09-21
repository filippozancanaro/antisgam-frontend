import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  ListItem,
  Typography,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useScanHistory, useScanRecord } from "@/features/scan/hooks/useScanHistory";
import type { ScanRecord } from "@/features/scan/model/types";
import { NicknameList, PageSection } from "@/shared/components";
import { useClipboard, useDisclosure } from "@/shared/hooks";
import { formatScanDate } from "@/shared/utils/formatDate";
import InstagramLimitsDialog from "./components/InstagramLimitsDialog";

interface Props {
  record: ScanRecord;
}

const ScanResults = ({ record }: Props) => {
  const navigate = useNavigate();
  const copy = useClipboard();
  const limitsDialog = useDisclosure();

  const { unfollowers, pendingRequests, removedSuggestions } = record.data;
  const hasUnfollowers = unfollowers.length > 0;
  const scanDate = useMemo(() => formatScanDate(record.timestamp), [record.timestamp]);

  return (
    <>
      {limitsDialog.isOpen && <InstagramLimitsDialog open onClose={limitsDialog.close} />}

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <PageSection>
            <Typography variant="h4" gutterBottom>
              ECCO CHI SEGUI MA NON TI SEGUE
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Ora va e vendicati, ma fai attenzione ai{" "}
              <Button variant="outlined" size="small" onClick={limitsDialog.open}>
                limiti di Instagram
              </Button>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Scansione del {scanDate}
            </Typography>
          </PageSection>

          <PageSection>
            <NicknameList
              aria-label="Unfollowers"
              nicknames={unfollowers}
              sx={{ my: 1 }}
              emptyContent={
                <Box sx={{ textAlign: "center", my: 4 }}>
                  <CelebrationIcon color="primary" sx={{ fontSize: 48 }} />
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    Tutti i tuoi seguiti ti seguono a loro volta, ottimo!
                  </Typography>
                </Box>
              }
            />
          </PageSection>

          <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<ContentCopyIcon />}
              onClick={() => copy(unfollowers.join("\n"))}
              disabled={!hasUnfollowers}
            >
              Copia negli appunti
            </Button>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={() => navigate("/")}>
              Ricominciamo!
            </Button>
          </Grid>

          <PageSection>
            <Typography variant="h5" gutterBottom>
              ALTRI DATI
            </Typography>
          </PageSection>

          <Grid size={{ xs: 12, lg: 5, xl: 4 }} offset={{ lg: 1, xl: 2 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Richieste inviate e mai accettate</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NicknameList
                  aria-label="Richieste inviate"
                  nicknames={pendingRequests}
                  sx={{ mb: 2 }}
                  emptyContent={<ListItem>Nessuna richiesta trovata</ListItem>}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContentCopyIcon />}
                  disabled={pendingRequests.length === 0}
                  onClick={() => copy(pendingRequests.join("\n"))}
                >
                  Copia
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid size={{ xs: 12, lg: 5, xl: 4 }}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Suggerimenti rimossi</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <NicknameList
                  aria-label="Suggerimenti rimossi"
                  nicknames={removedSuggestions}
                  sx={{ mb: 2 }}
                  emptyContent={<ListItem>Nessun suggerimento rimosso</ListItem>}
                />
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ContentCopyIcon />}
                  disabled={removedSuggestions.length === 0}
                  onClick={() => copy(removedSuggestions.join("\n"))}
                >
                  Copia
                </Button>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/**
 * `/results/:scanId` mostra una scansione della cronologia;
 * `/results` senza id reindirizza alla più recente (o alla home se non ce ne sono).
 */
const Results = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const history = useScanHistory();
  const record = useScanRecord(scanId);

  if (!scanId) {
    const latest = history[0];
    return <Navigate to={latest ? `/results/${latest.id}` : "/"} replace />;
  }

  if (!record) return <Navigate to="/" replace />;

  return <ScanResults record={record} />;
};

export default Results;

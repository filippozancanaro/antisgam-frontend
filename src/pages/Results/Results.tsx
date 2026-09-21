import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
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

  // Sezioni opzionali: l'export può non contenerle (o Meta può cambiarne il formato),
  // quindi mostriamo solo quelle con dati invece di accordion vuoti.
  const extraSections = useMemo(
    () =>
      [
        { title: "Richieste inviate e mai accettate", nicknames: pendingRequests },
        { title: "Suggerimenti rimossi", nicknames: removedSuggestions },
      ].filter((section) => section.nicknames.length > 0),
    [pendingRequests, removedSuggestions],
  );

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

          {extraSections.length > 0 && (
            <PageSection>
              <Typography variant="h5" gutterBottom>
                ALTRI DATI
              </Typography>
            </PageSection>
          )}

          {extraSections.map((section, index) => (
            <Grid
              key={section.title}
              size={{ xs: 12, lg: 5, xl: 4 }}
              offset={index === 0 ? { lg: 1, xl: 2 } : undefined}
            >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{section.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <NicknameList
                    aria-label={section.title}
                    nicknames={section.nicknames}
                    sx={{ mb: 2 }}
                    emptyContent={null}
                  />
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ContentCopyIcon />}
                    onClick={() => copy(section.nicknames.join("\n"))}
                  >
                    Copia
                  </Button>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
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

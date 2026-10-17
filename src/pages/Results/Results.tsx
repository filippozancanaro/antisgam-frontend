import { Copy, PartyPopper, RotateCcw, TriangleAlert } from "lucide-react";
import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useScanHistory, useScanRecord } from "@/features/scan/hooks/useScanHistory";
import type { ScanRecord } from "@/features/scan/model/types";
import { NicknameList } from "@/shared/components";
import { useClipboard, useDisclosure } from "@/shared/hooks";
import { Accordion, AccordionItem, Badge, Button, Page, Section } from "@/shared/ui";
import { formatScanDate } from "@/shared/utils/formatDate";
import InstagramLimitsDialog from "./components/InstagramLimitsDialog";
import styles from "./Results.module.scss";

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
        { id: "pending", title: "Richieste inviate e mai accettate", nicknames: pendingRequests },
        { id: "removed", title: "Suggerimenti rimossi", nicknames: removedSuggestions },
      ].filter((section) => section.nicknames.length > 0),
    [pendingRequests, removedSuggestions],
  );

  return (
    <>
      {limitsDialog.isOpen && <InstagramLimitsDialog open onClose={limitsDialog.close} />}

      <Page
        eyebrow={`Scansione del ${scanDate}`}
        title="Ecco chi segui ma non ti segue"
        description={
          <span className={styles.subtitle}>
            Ora va e vendicati, ma fai attenzione ai
            <Button variant="secondary" size="sm" icon={<TriangleAlert />} onPress={limitsDialog.open}>
              limiti di Instagram
            </Button>
          </span>
        }
        actions={
          <Badge tone={hasUnfollowers ? "accent" : "success"}>
            {hasUnfollowers ? `${unfollowers.length} unfollowers` : "nessun unfollower"}
          </Badge>
        }
      >
        <Section>
          <NicknameList
            aria-label="Unfollowers"
            nicknames={unfollowers}
            emptyContent={
              <div className={styles.empty}>
                <PartyPopper className={styles.emptyIcon} aria-hidden="true" />
                <p className={styles.emptyText}>Tutti i tuoi seguiti ti seguono a loro volta, ottimo!</p>
              </div>
            }
          />

          <div className={styles.actions}>
            <Button
              variant="primary"
              icon={<Copy />}
              onPress={() => copy(unfollowers.join("\n"))}
              isDisabled={!hasUnfollowers}
            >
              Copia negli appunti
            </Button>
            <Button variant="secondary" icon={<RotateCcw />} onPress={() => navigate("/")}>
              Ricominciamo!
            </Button>
          </div>
        </Section>

        {extraSections.length > 0 && (
          <Section title="Altri dati" description="Informazioni extra trovate nell'export.">
            <Accordion>
              {extraSections.map((section) => (
                <AccordionItem key={section.id} id={section.id} title={section.title}>
                  <NicknameList aria-label={section.title} nicknames={section.nicknames} emptyContent={null} />
                  <div className={styles.accordionAction}>
                    <Button variant="secondary" size="sm" icon={<Copy />} onPress={() => copy(section.nicknames.join("\n"))}>
                      Copia
                    </Button>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>
        )}
      </Page>
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

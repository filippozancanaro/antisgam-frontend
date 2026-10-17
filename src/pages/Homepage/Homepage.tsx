import { CircleHelp, FolderArchive, Rocket } from "lucide-react";
import AnalysisOverlay from "@/features/scan/components/AnalysisOverlay";
import { useScanUpload } from "@/features/scan/hooks/useScanUpload";
import { useDisclosure } from "@/shared/hooks";
import { Button, Page, Section } from "@/shared/ui";
import TutorialDialog from "./components/TutorialDialog";
import Uploader from "./components/Uploader";
import styles from "./Homepage.module.scss";

const Homepage = () => {
  const tutorial = useDisclosure();
  const { file, selectZipFile, clearSelection, submit, reset, isAnalyzing, finishAnalysis } = useScanUpload();

  return (
    <>
      {tutorial.isOpen && <TutorialDialog open onClose={tutorial.close} />}
      <AnalysisOverlay open={isAnalyzing} onDone={finishAnalysis} />

      <Page
        eyebrow="Analisi 100% locale"
        title="Scopri chi non ti ricambia"
        description="Carica l'export dei tuoi dati Instagram: i file non lasciano mai questo browser."
      >
        <Section
          step={1}
          title="Leggi il tutorial e recupera i dati"
          description="Servono pochi minuti, ma Meta impiega un po' a preparare lo zip."
        >
          <Button variant="secondary" size="lg" fullWidth icon={<CircleHelp />} onPress={tutorial.open}>
            Spiegami tutto
          </Button>
        </Section>

        <Section step={2} title="Carica i tuoi dati" icon={<FolderArchive />}>
          <Uploader file={file} onFileSelected={selectZipFile} onClear={clearSelection} />
        </Section>

        <Section step={3} title="Esegui l'analisi" icon={<Rocket />}>
          <Button variant="primary" size="lg" fullWidth icon={<Rocket />} onPress={submit}>
            ANDIAMO!
          </Button>
          <div className={styles.secondaryAction}>
            <Button variant="ghost" size="sm" onPress={reset}>
              oppure, ricominciamo
            </Button>
          </div>
        </Section>
      </Page>
    </>
  );
};

export default Homepage;

import { CheckCircle2 } from "lucide-react";
import { Button, Dialog } from "@/shared/ui";
import { cx } from "@/shared/utils/cx";
import TutorialStep from "./TutorialStep";
import { TUTORIAL_STEPS } from "./tutorialSteps";
import styles from "./TutorialDialog.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TutorialDialog = ({ open, onClose }: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    size="xl"
    title="Tutorial"
    footer={
      <Button variant="primary" icon={<CheckCircle2 />} onPress={onClose}>
        Ok, ho capito!
      </Button>
    }
  >
    <div className={styles.intro}>
      <h3 className={styles.welcome}>👋 BENVENUTO/A IN ANTISGAM 👋</h3>
      <p className={styles.claim}>
        LA PRIMA ED UNICA APP PER SGAMARE GLI UNFOLLOWERS* E NON FARSI BANNARE!
      </p>
      <p className={styles.note}>*o meglio, chi segui ma non ti segue a sua volta</p>
      <p className={styles.text}>
        se sei qui probabilmente starai cercando di capire quali dati caricare e come funziona l&apos;app: non
        preoccuparti, è un po&apos; lungo ma è tutto molto semplice!
      </p>
      <p className={styles.text}>
        e...si, purtroppo è l&apos;unico modo per non essere bannati da Meta: triste ma vero.
      </p>
      <p className={styles.text}>
        Ricorda: <b>FAI ATTENZIONE AGLI STEP 10 e 11</b>: mi raccomando! 😁
      </p>
    </div>

    <h3 className={styles.sectionTitle}>COME RECUPERARE I DATI</h3>

    <div className={styles.steps}>
      {TUTORIAL_STEPS.map((step) => (
        <div key={step.number} className={cx(styles.cell, step.fullWidth && styles.cellWide)}>
          <TutorialStep
            number={step.number}
            text={step.text}
            imagePath={step.image}
            imageAlt={step.imageAlt}
            isSvg={step.isSvg}
            highlight={step.highlight}
          />
        </div>
      ))}
    </div>
  </Dialog>
);

export default TutorialDialog;

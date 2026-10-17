import { CheckCircle2 } from "lucide-react";
import { Button, Card, Dialog } from "@/shared/ui";
import styles from "./InstagramLimitsDialog.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface LimitFaq {
  question: string;
  answers: readonly string[];
}

const FAQS: readonly LimitFaq[] = [
  {
    question: "Quanti Follow/Unfollow posso fare e in quanto tempo?",
    answers: [
      "Massimo 50 o 60 follows e unfollows (sommati) all'ora al momento dovrebbero essere considerati sicuri.",
      "Il limite giornaliero dovrebbe essere attorno ad un massimo 150 operazioni di segui e unfollow.",
    ],
  },
  {
    question: "Che succede se eccedo questi limiti?",
    answers: [
      "L'account potrebbe essere sospeso o shadowbannato per comportamenti sospetti.",
      "Potrebbero inoltre sospendere alcune azioni come i direct, commenti, reaction, ecc...",
    ],
  },
  {
    question: "Parlavi di somma tra follow e unfollow: come mai?",
    answers: ["Meta equipara le due azioni, ragion per cui vanno sommate."],
  },
  {
    question: "Perché parli col condizionale?",
    answers: [
      "Perché Meta è Meta e a Meta piace cambiare: un po' come le scale di Harry Potter, ma peggio.",
    ],
  },
];

const InstagramLimitsDialog = ({ open, onClose }: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    title="Informazioni importanti"
    footer={
      <Button variant="primary" icon={<CheckCircle2 />} onPress={onClose}>
        Ok, ho capito!
      </Button>
    }
  >
    <div className={styles.intro}>
      <h3 className={styles.title}>LIMITI DI INSTAGRAM</h3>
      <p className={styles.subtitle}>
        ovvero come non farsi sospendere l&apos;account per la troppa cattiveria
      </p>
    </div>

    <div className={styles.grid}>
      {FAQS.map((faq) => (
        <Card key={faq.question} title={faq.question} className={styles.card}>
          {faq.answers.map((answer) => (
            <p key={answer} className={styles.answer}>
              {answer}
            </p>
          ))}
        </Card>
      ))}
    </div>
  </Dialog>
);

export default InstagramLimitsDialog;

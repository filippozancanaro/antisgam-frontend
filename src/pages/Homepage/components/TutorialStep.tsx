import { cx } from "@/shared/utils/cx";
import { Card } from "@/shared/ui";
import styles from "./TutorialStep.module.scss";

interface Props {
  number: string | number;
  text: string;
  imagePath: string;
  imageAlt: string;
  /** Le illustrazioni svg vanno mostrate senza cornice né ombra. */
  isSvg?: boolean;
  /** Step da non sbagliare: evidenziato con il colore di accento. */
  highlight?: boolean;
}

const TutorialStep = ({ number, text, imagePath, imageAlt, isSvg = false, highlight = false }: Props) => (
  <Card title={number} highlight={highlight} className={styles.step}>
    <p className={cx(styles.text, highlight && styles.textHighlight)}>{text}</p>
    <img className={cx(styles.image, isSvg && styles.illustration)} src={imagePath} alt={imageAlt} />
  </Card>
);

export default TutorialStep;

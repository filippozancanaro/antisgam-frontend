import { CheckCircle2, Monitor, Moon, RotateCcw, Sun, Trash2 } from "lucide-react";
import type { UserThemeMode } from "@/features/theme";
import { Button, Page, RadioGroup, Section, type RadioOption } from "@/shared/ui";
import { useSettingsForm } from "./useSettingsForm";
import styles from "./Settings.module.scss";

const THEME_OPTIONS: ReadonlyArray<RadioOption<UserThemeMode>> = [
  { value: "auto", label: "Automatico", icon: <Monitor /> },
  { value: "light", label: "Chiaro", icon: <Sun /> },
  { value: "dark", label: "Scuro", icon: <Moon /> },
];

const Settings = () => {
  const { theme, setTheme, save, discard, historyCount, clearScanHistory } = useSettingsForm();

  return (
    <Page eyebrow="Preferenze" title="Impostazioni">
      <Section title="Grafica" description="Il tema automatico segue quello del sistema.">
        <RadioGroup
          label="Preferenza del tema"
          value={theme}
          onChange={setTheme}
          options={THEME_OPTIONS}
        />
      </Section>

      <Section
        title="Privacy"
        description={`Le scansioni restano salvate solo su questo dispositivo (${historyCount} in cronologia).`}
      >
        <div className={styles.start}>
          <Button variant="danger" icon={<Trash2 />} isDisabled={historyCount === 0} onPress={clearScanHistory}>
            Cancella cronologia scansioni
          </Button>
        </div>
      </Section>

      <div className={styles.formActions}>
        <Button variant="ghost" icon={<RotateCcw />} onPress={discard}>
          Annulla
        </Button>
        <Button variant="primary" icon={<CheckCircle2 />} onPress={save}>
          Salva
        </Button>
      </div>
    </Page>
  );
};

export default Settings;

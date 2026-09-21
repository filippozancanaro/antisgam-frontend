import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import type { UserThemeMode } from "@/features/theme";
import { PageSection } from "@/shared/components";
import { useSettingsForm } from "./useSettingsForm";

const THEME_OPTIONS: ReadonlyArray<{ value: UserThemeMode; label: string }> = [
  { value: "auto", label: "Automatico" },
  { value: "light", label: "Chiaro" },
  { value: "dark", label: "Scuro" },
];

const Settings = () => {
  const { theme, setTheme, save, discard, historyCount, clearScanHistory } = useSettingsForm();

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <PageSection>
          <Typography variant="h4" gutterBottom>
            IMPOSTAZIONI
          </Typography>
        </PageSection>

        <PageSection>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Grafica
          </Typography>
          <FormControl>
            <FormLabel id="theme-preference-label">Preferenza del tema</FormLabel>
            <RadioGroup
              aria-labelledby="theme-preference-label"
              value={theme}
              onChange={(_event, value) => setTheme(value as UserThemeMode)}
            >
              {THEME_OPTIONS.map((option) => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
          </FormControl>
        </PageSection>

        <PageSection>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Privacy
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Le scansioni restano salvate solo su questo dispositivo ({historyCount} in cronologia).
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            disabled={historyCount === 0}
            onClick={clearScanHistory}
          >
            Cancella cronologia scansioni
          </Button>
        </PageSection>

        <PageSection sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={discard}>
            Annulla
          </Button>
          <Button variant="contained" startIcon={<CheckCircleIcon />} onClick={save}>
            Salva
          </Button>
        </PageSection>
      </Grid>
    </Box>
  );
};

export default Settings;

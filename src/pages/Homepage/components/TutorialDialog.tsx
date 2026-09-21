import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TutorialStep from "./TutorialStep";
import { TUTORIAL_STEPS } from "./tutorialSteps";

interface Props {
  open: boolean;
  onClose: () => void;
}

const TutorialDialog = ({ open, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen} maxWidth="xl" fullWidth>
      <DialogTitle variant="h5">Tutorial</DialogTitle>

      <DialogContent dividers sx={{ maxHeight: fullScreen ? "100%" : 600, overflowY: "auto" }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" gutterBottom color="primary" sx={{ textAlign: "center" }}>
              👋 BENVENUTO/A IN ANTISGAM 👋
            </Typography>
            <Typography variant="subtitle1" sx={{ textAlign: "center", fontSize: 16 }}>
              LA PRIMA ED UNICA APP PER SGAMARE GLI UNFOLLOWERS* E NON FARSI BANNARE!
            </Typography>
            <Typography
              variant="subtitle1"
              color="textSecondary"
              gutterBottom
              sx={{ textAlign: "center", fontSize: 10 }}
            >
              *o meglio, chi segui ma non ti segue a sua volta
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2" color="textSecondary" sx={{ textAlign: "center" }}>
              se sei qui probabilmente starai cercando di capire quali dati caricare e come funziona l'app: non
              preoccuparti, è un po' lungo ma è tutto molto semplice!
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ textAlign: "center" }}>
              e...si, purtroppo è l'unico modo per non essere bannati da Meta: triste ma vero.
            </Typography>
            <Typography variant="body1" color="textPrimary" gutterBottom sx={{ textAlign: "center" }}>
              Ricorda: <b>FAI ATTENZIONE AGLI STEP 10 e 11</b>: mi raccomando! 😁
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6" color="primary" gutterBottom>
              COME RECUPERARE I DATI
            </Typography>
          </Grid>

          {TUTORIAL_STEPS.map((step) => (
            <Grid key={step.number} size={{ xs: 12, lg: step.fullWidth ? 12 : 6 }}>
              <TutorialStep
                number={step.number}
                text={step.text}
                imagePath={step.image}
                imageAlt={step.imageAlt}
                isSvg={step.isSvg}
                highlight={step.highlight}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", py: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose} startIcon={<CheckCircleIcon />}>
          Ok, ho capito!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialDialog;

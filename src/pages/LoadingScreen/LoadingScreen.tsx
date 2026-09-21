import { Box, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material";
import { useCallback } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useScanRecord } from "@/features/scan/hooks/useScanHistory";
import { useRotatingIndex, useTimeout } from "@/shared/hooks";
import { LOADING_MIN_DURATION_MS, LOADING_TIP_INTERVAL_MS, LOADING_TIPS } from "./loadingTips";

interface Props {
  scanId: string;
}

/**
 * L'analisi è già stata eseguita e salvata prima di arrivare qui:
 * questa schermata aspetta il tempo minimo e poi mostra i risultati.
 */
const LoadingCountdown = ({ scanId }: Props) => {
  const navigate = useNavigate();
  const tipIndex = useRotatingIndex(LOADING_TIPS.length, LOADING_TIP_INTERVAL_MS);

  const goToResults = useCallback(() => navigate(`/results/${scanId}`, { replace: true }), [navigate, scanId]);
  useTimeout(goToResults, LOADING_MIN_DURATION_MS);

  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 3,
        maxWidth: { xs: "100%", md: "900px" },
        mx: "auto",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/assets/images/loading.svg"
          alt="Loading"
          sx={{ width: { xs: "60%", sm: "50%", md: "40%" }, maxWidth: 300, mb: 4, mx: "auto" }}
        />

        <CircularProgress color="primary" size={90} aria-label="Analisi in corso" />
      </Box>

      <Box sx={{ mt: 4, px: 2 }}>
        <Card>
          <CardContent>
            <Typography variant="body1" align="center">
              {LOADING_TIPS[tipIndex]}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

const LoadingScreen = () => {
  const { scanId } = useParams<{ scanId: string }>();
  const record = useScanRecord(scanId);

  if (!scanId || !record) return <Navigate to="/" replace />;

  return <LoadingCountdown scanId={scanId} />;
};

export default LoadingScreen;

import { Box, Button, Grid, Typography } from "@mui/material";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import HelpIcon from "@mui/icons-material/Help";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useScanUpload } from "@/features/scan/hooks/useScanUpload";
import { PageSection } from "@/shared/components";
import { useDisclosure } from "@/shared/hooks";
import TutorialDialog from "./components/TutorialDialog";
import Uploader from "./components/Uploader";

const Homepage = () => {
  const tutorial = useDisclosure();
  const { file, selectZipFile, clearSelection, submit, reset } = useScanUpload();

  return (
    <>
      {tutorial.isOpen && <TutorialDialog open onClose={tutorial.close} />}

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <PageSection>
            <Typography variant="h5" sx={{ pb: 2 }}>
              1 - LEGGI IL TUTORIAL E RECUPERA I DATI
            </Typography>
            <Button fullWidth startIcon={<HelpIcon />} variant="outlined" size="large" onClick={tutorial.open}>
              Spiegami tutto
            </Button>
          </PageSection>

          <PageSection>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                2 - CARICA I TUOI DATI
              </Typography>
              <FolderZipIcon color="primary" />
            </Box>
          </PageSection>

          <Uploader file={file} onFileSelected={selectZipFile} onClear={clearSelection} />

          <PageSection>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                3 - ESEGUI L'ANALISI
              </Typography>
              <RocketLaunchIcon color="primary" />
            </Box>
          </PageSection>

          <PageSection>
            <Button fullWidth variant="contained" size="large" startIcon={<RocketLaunchIcon />} onClick={submit}>
              ANDIAMO!
            </Button>
          </PageSection>

          <PageSection>
            <Button fullWidth variant="text" size="medium" onClick={reset}>
              oppure, ricominciamo
            </Button>
          </PageSection>
        </Grid>
      </Box>
    </>
  );
};

export default Homepage;

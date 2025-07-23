import React, { useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { ResultsContext } from './ResultsContext';

const Results: React.FC = () => {
  const context = useContext(ResultsContext);
  if (!context) throw new Error('Results deve essere usato all’interno di <ResultsProvider>');

  const { unfollowers, copyToClipboard, restart } = context;
  const hasUnfollowers = unfollowers?.length > 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ecco chi ha smesso di seguirti
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        (ora va e vendicati)
      </Typography>

      <Box
        sx={{
          maxHeight: 400,
          overflowY: 'auto',
          mt: 3,
          mb: 4,
          border: '1px solid #ccc',
          borderRadius: 2,
          p: 2,
        }}
      >
        {hasUnfollowers ? (
          <List>
            {unfollowers.map((nickname, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={nickname} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              mt: 4,
              mb: 4
            }}
          >
            <CelebrationIcon color="primary" sx={{ fontSize: 48 }} />
            <Typography variant="h5" mt={2}>
              Nessuno ti ha unfollowato, grande!
            </Typography>
          </Box>
        )}
      </Box>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ textAlign: 'center' }}
      >
        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            onClick={copyToClipboard}
            disabled={!hasUnfollowers}
          >
            Copia negli appunti
          </Button>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Button
            variant="outlined"
            startIcon={<RestartAltIcon />}
            onClick={restart}
          >
            Ricominciamo!
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
};

export default Results;

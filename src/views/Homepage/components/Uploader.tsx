import React, { useContext } from 'react';
import { HomepageContext } from '../HomepageContext';
import {
    Box,
    Grid,
    Typography,
} from '@mui/material';
import { FilePicker } from '../../../components';


const Uploader: React.FC = () => {
    const context = useContext(HomepageContext);
    if (!context) throw new Error('Uploader deve essere usato all’interno di <HomepageProvider>');

    const { manageJsonFile, manageZipFile, cleanupFormField } = context;

    return (
        <>
            {context.mode === 'zip' ?
                <>
                    <Grid size={{ md: 3, xl: 4 }} sx={{ display: { xs: 'none', md: 'block' } }} />
                    {/* Modalità ZIP */}
                    {/* Zip di dati */}
                    <Grid size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
                        <Box sx={{ bgcolor: '#e0f7fa', p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'common.black' }}>CARICA LO ZIP CON I TUOI DATI</Typography>
                            <FilePicker
                                key="zipfile"
                                acceptedFiles={['application/x-zip-compressed', 'application/zip']}
                                label="File di dati da Instagram"
                                enabled={true}
                                onUploadCompleted={(_name, content) => manageZipFile(content)}
                                onSelectionCleaned={() => {
                                    cleanupFormField('followers');
                                    cleanupFormField('following');
                                }}
                            />

                        </Box>
                    </Grid>
                    <Grid size={{ md: 3, xl: 4 }} sx={{ display: { xs: 'none', md: 'block' } }} />
                </> :
                <>
                    {/* Modalità JSON */}
                    <Grid size={{ md: 1, xl: 2 }} sx={{ display: { xs: 'none', md: 'block' } }} />
                    {/* Followers */}
                    <Grid size={{ xs: 12, sm: 12, md: 5, xl: 4 }}>
                        <Box sx={{ bgcolor: '#e0f7fa', p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'common.black' }}>FOLLOWERS</Typography>

                            <FilePicker
                                key="followers"
                                acceptedFiles={['application/json']}
                                label="Followers"
                                enabled={true}
                                onUploadCompleted={(_name, content) => manageJsonFile(content, 'followers')}
                                onSelectionCleaned={() => {
                                    cleanupFormField('followers');
                                }}
                            />

                        </Box>
                    </Grid>

                    {/* Following */}
                    <Grid size={{ xs: 12, sm: 12, md: 5, xl: 4 }}>
                        <Box sx={{ bgcolor: '#fce4ec', p: 2, textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ color: 'common.black' }}>SEGUITI</Typography>

                            <FilePicker
                                key="following"
                                acceptedFiles={['application/json']}
                                label="Following"
                                enabled={true}
                                onUploadCompleted={(_name, content) => manageJsonFile(content, 'following')}
                                onSelectionCleaned={() => {
                                    cleanupFormField('following');
                                }}
                            />

                        </Box>
                    </Grid>

                    <Grid size={{ md: 1, xl: 2 }} sx={{ display: { xs: 'none', md: 'block' } }} />

                </>
            }

        </>
    );
};

export default Uploader;

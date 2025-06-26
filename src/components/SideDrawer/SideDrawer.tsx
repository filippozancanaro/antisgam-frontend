import {
    SwipeableDrawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

const SideDrawer = () => {

    return (
        <SwipeableDrawer
            open={true} // da gestire via Redux
            onOpen={() => { }}
            onClose={() => { }}
        >
            
            <List>
                <ListItemButton component={Link} to="/home">
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                
                {/* promemoria: aggiungere le altre routes qui. o magari il tutorial o qualche easter egg */}

            </List>

        </SwipeableDrawer>
    );
};

export default SideDrawer;

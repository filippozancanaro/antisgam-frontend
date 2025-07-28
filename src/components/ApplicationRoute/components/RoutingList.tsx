import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

const RoutingList = () => {
    const navigate = useNavigate();

    const routes = [
        { label: 'Antisgam', icon: <HomeIcon color="primary" />, path: '/' },
        { label: 'Impostazioni', icon: <SettingsIcon color="primary" />, path: '/settings' },
    ];

    return (
        <List>
            {routes.map(({ label, icon, path }, index) => (
                <ListItemButton key={index} onClick={() => navigate(path)}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default RoutingList;

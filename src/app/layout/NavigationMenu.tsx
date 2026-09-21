import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import type { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScanHistoryList from "./ScanHistoryList";

interface MenuRoute {
  label: string;
  path: string;
  icon: ReactElement;
}

const MENU_ROUTES: readonly MenuRoute[] = [
  { label: "Antisgam", path: "/", icon: <HomeIcon color="primary" /> },
  { label: "Impostazioni", path: "/settings", icon: <SettingsIcon color="primary" /> },
];

interface Props {
  /** Chiamata dopo ogni navigazione (per chiudere il drawer). */
  onNavigate?: () => void;
}

const NavigationMenu = ({ onNavigate }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const go = (path: string) => {
    onNavigate?.();
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <List aria-label="Navigazione">
        {MENU_ROUTES.map(({ label, icon, path }) => (
          <ListItemButton key={path} selected={pathname === path} onClick={() => go(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <Box sx={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        <ScanHistoryList onNavigate={onNavigate} maxHeight="100%" />
      </Box>
    </Box>
  );
};

export default NavigationMenu;

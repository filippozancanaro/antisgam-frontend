import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import type { JSX } from "react";
import { useGlobalCleanup } from "../../../shared/antisgam-cleanup/useAntisgamCleanup";

interface IRouteMenuItem {
  label: string;
  path: string;
  icon: JSX.Element;
  shouldCleanupState: boolean;
}

const RoutingList = () => {
  const navigate = useNavigate();
  const cleanup = useGlobalCleanup();

  const routes: IRouteMenuItem[] = [
    {
      label: "Antisgam",
      icon: <HomeIcon color="primary" />,
      path: "/",
      shouldCleanupState: true,
    },
    {
      label: "Impostazioni",
      icon: <SettingsIcon color="primary" />,
      path: "/settings",
      shouldCleanupState: true,
    },
  ];

  const routeClickHandler = (path: string, shouldCleanupState: boolean) => {
    if (shouldCleanupState === true) cleanup();

    navigate(path);
  };

  return (
    <List>
      {(routes ?? []).map(
        ({ label, icon, path, shouldCleanupState }, index) => (
          <ListItemButton
            key={index}
            onClick={() => routeClickHandler(path, shouldCleanupState)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ),
      )}
    </List>
  );
};

export default RoutingList;

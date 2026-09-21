import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router-dom";
import { useDisclosure } from "@/shared/hooks";
import NavigationMenu from "./NavigationMenu";

const DRAWER_WIDTH = 280;
const APP_TITLE = "ANTISGAM";

const AppLayout = () => {
  const navigate = useNavigate();
  const drawer = useDisclosure();

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Drawer anchor="left" open={drawer.isOpen} onClose={drawer.close}>
        <Box sx={{ width: DRAWER_WIDTH, height: "100%", display: "flex", flexDirection: "column" }} role="presentation">
          <NavigationMenu onNavigate={drawer.close} />
        </Box>
      </Drawer>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <AppBar position="static" color="default">
          <Toolbar>
            <IconButton edge="start" color="primary" aria-label="Apri menu" onClick={drawer.toggle}>
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="button"
              onClick={() => navigate("/")}
              sx={{ ml: 2, cursor: "pointer", background: "none", border: 0, p: 0, color: "primary.main" }}
            >
              {APP_TITLE}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, overflowY: "auto", overflowX: "hidden", p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;

import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { ThemeManager } from "@/features/theme";
import AppRoutes from "./router";

const App = () => (
  <ThemeManager>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </SnackbarProvider>
  </ThemeManager>
);

export default App;

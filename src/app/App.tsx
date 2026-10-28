import { BrowserRouter } from "react-router-dom";
import { ThemeManager } from "@/features/theme";
import { ToastRegion } from "@/shared/ui";
import AppRoutes from "./router";

const App = () => (
  <ThemeManager>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastRegion />
  </ThemeManager>
);

export default App;

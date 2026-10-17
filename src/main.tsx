import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import App from "./app/App";

import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./styles/global.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JotaiProvider>
      <App />
    </JotaiProvider>
  </StrictMode>,
);

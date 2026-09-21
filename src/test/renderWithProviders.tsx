import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { createStore, Provider as JotaiProvider } from "jotai";
import { SnackbarProvider } from "notistack";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeManager } from "@/features/theme";
import LocationProbe from "./LocationProbe";

type Store = ReturnType<typeof createStore>;

interface Options extends Omit<RenderOptions, "wrapper"> {
  /** Rotta iniziale del MemoryRouter. */
  route?: string;
  /** Path pattern su cui montare `ui` (default: qualsiasi). */
  path?: string;
  store?: Store;
}

/** Render con tutti i provider dell'app (Jotai, tema, snackbar, router in memoria). */
export const renderWithProviders = (ui: ReactElement, { route = "/", path = "*", store, ...options }: Options = {}) => {
  const jotaiStore = store ?? createStore();

  const result = render(
    <JotaiProvider store={jotaiStore}>
      <ThemeManager>
        <SnackbarProvider>
          <MemoryRouter initialEntries={[route]}>
            <Routes>
              <Route path={path} element={ui} />
              <Route path="*" element={<LocationProbe />} />
            </Routes>
          </MemoryRouter>
        </SnackbarProvider>
      </ThemeManager>
    </JotaiProvider>,
    options,
  );

  return { ...result, store: jotaiStore };
};


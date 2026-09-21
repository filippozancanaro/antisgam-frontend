import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "jotai";
import { describe, expect, it } from "vitest";
import { addScanToHistoryAtom, scanHistoryAtom } from "@/features/scan/store/scanAtoms";
import { THEME_STORAGE_KEY, userThemeModeAtom } from "@/features/theme/store/themeAtoms";
import { renderWithProviders } from "@/test/renderWithProviders";
import Settings from "./Settings";

describe("Settings", () => {
  it("salva la preferenza del tema e torna alla home", async () => {
    const { store } = renderWithProviders(<Settings />, { route: "/settings", path: "/settings" });

    await userEvent.click(screen.getByRole("radio", { name: "Scuro" }));
    await userEvent.click(screen.getByRole("button", { name: "Salva" }));

    expect(store.get(userThemeModeAtom)).toBe("dark");
    expect(JSON.parse(localStorage.getItem(THEME_STORAGE_KEY) ?? "null")).toBe("dark");
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("annulla senza applicare le modifiche", async () => {
    const { store } = renderWithProviders(<Settings />, { route: "/settings", path: "/settings" });

    await userEvent.click(screen.getByRole("radio", { name: "Chiaro" }));
    await userEvent.click(screen.getByRole("button", { name: "Annulla" }));

    expect(store.get(userThemeModeAtom)).toBe("auto");
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("cancella la cronologia delle scansioni", async () => {
    const store = createStore();
    store.set(addScanToHistoryAtom, {
      followers: [],
      following: [],
      unfollowers: [],
      pendingRequests: [],
      removedSuggestions: [],
    });
    renderWithProviders(<Settings />, { store, route: "/settings", path: "/settings" });

    const button = screen.getByRole("button", { name: /Cancella cronologia/ });
    expect(button).toBeEnabled();

    await userEvent.click(button);

    expect(store.get(scanHistoryAtom)).toEqual([]);
    expect(await screen.findByText(/Cronologia delle scansioni cancellata/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancella cronologia/ })).toBeDisabled();
  });
});

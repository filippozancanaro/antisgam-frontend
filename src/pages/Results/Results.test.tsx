import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "jotai";
import { describe, expect, it, vi } from "vitest";
import { addScanToHistoryAtom } from "@/features/scan/store/scanAtoms";
import type { ScanResult } from "@/features/scan/model/types";
import { renderWithProviders } from "@/test/renderWithProviders";
import Results from "./Results";

const seed = (data: Partial<ScanResult> = {}) => {
  const store = createStore();
  const record = store.set(addScanToHistoryAtom, {
    followers: ["alice"],
    following: ["alice", "eve", "zed"],
    unfollowers: ["eve", "zed"],
    pendingRequests: ["private_pam"],
    removedSuggestions: [],
    ...data,
  });
  return { store, record };
};

describe("Results", () => {
  it("mostra gli unfollowers della scansione indicata nell'url", () => {
    const { store, record } = seed();
    renderWithProviders(<Results />, { store, route: `/results/${record.id}`, path: "/results/:scanId?" });

    const list = screen.getByRole("list", { name: "Unfollowers" });
    expect(within(list).getAllByRole("listitem").map((li) => li.textContent)).toEqual(["eve", "zed"]);
    expect(screen.getByText(/Scansione del/)).toBeInTheDocument();
  });

  it("mostra lo stato vuoto quando non ci sono unfollowers", () => {
    const { store, record } = seed({ unfollowers: [] });
    renderWithProviders(<Results />, { store, route: `/results/${record.id}`, path: "/results/:scanId?" });

    expect(screen.getByText(/Tutti i tuoi seguiti ti seguono/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Copia negli appunti/ })).toBeDisabled();
  });

  it("copia gli unfollowers negli appunti", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    const { store, record } = seed();
    renderWithProviders(<Results />, { store, route: `/results/${record.id}`, path: "/results/:scanId?" });

    await userEvent.click(screen.getByRole("button", { name: /Copia negli appunti/ }));

    expect(writeText).toHaveBeenCalledWith("eve\nzed");
    expect(await screen.findByText("Testo copiato negli appunti")).toBeInTheDocument();
  });

  it("senza id reindirizza alla scansione più recente", () => {
    const { store, record } = seed();
    renderWithProviders(<Results />, { store, route: "/results", path: "/results/:scanId?" });

    expect(screen.getByRole("list", { name: "Unfollowers" })).toBeInTheDocument();
    expect(screen.queryByTestId("location")).not.toBeInTheDocument();
    expect(record).toBeDefined();
  });

  it("con id sconosciuto torna alla home", () => {
    renderWithProviders(<Results />, { route: "/results/nope", path: "/results/:scanId?" });
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });

  it("senza cronologia torna alla home", () => {
    renderWithProviders(<Results />, { route: "/results", path: "/results/:scanId?" });
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});

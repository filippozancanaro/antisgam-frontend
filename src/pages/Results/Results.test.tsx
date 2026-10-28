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

  describe("sezione ALTRI DATI", () => {
    const render = (data: Partial<ScanResult>) => {
      const { store, record } = seed(data);
      renderWithProviders(<Results />, { store, route: `/results/${record.id}`, path: "/results/:scanId?" });
    };

    it("mostra solo gli accordion che hanno dati", () => {
      render({ pendingRequests: ["private_pam"], removedSuggestions: [] });

      expect(screen.getByText("Altri dati")).toBeInTheDocument();
      expect(screen.getByText("Richieste inviate e mai accettate")).toBeInTheDocument();
      expect(screen.queryByText("Suggerimenti rimossi")).not.toBeInTheDocument();
    });

    it("mostra entrambi gli accordion quando entrambi hanno dati", () => {
      render({ pendingRequests: ["private_pam"], removedSuggestions: ["spam_sam"] });

      expect(screen.getByText("Richieste inviate e mai accettate")).toBeInTheDocument();
      expect(screen.getByText("Suggerimenti rimossi")).toBeInTheDocument();
    });

    it("nasconde l'intera sezione se non ci sono dati opzionali", () => {
      render({ pendingRequests: [], removedSuggestions: [] });

      expect(screen.queryByText("Altri dati")).not.toBeInTheDocument();
      expect(screen.queryByText("Richieste inviate e mai accettate")).not.toBeInTheDocument();
      expect(screen.queryByText("Suggerimenti rimossi")).not.toBeInTheDocument();
    });
  });

  describe("nickname nuovi rispetto alla scansione precedente", () => {
    const base = { followers: ["alice"], following: ["alice"], removedSuggestions: [] };

    it("evidenzia solo i nickname comparsi nell'ultima scansione", async () => {
      const store = createStore();
      store.set(addScanToHistoryAtom, { ...base, unfollowers: ["eve"], pendingRequests: ["pam"] });
      const latest = store.set(addScanToHistoryAtom, {
        ...base,
        unfollowers: ["eve", "zed"],
        pendingRequests: ["pam", "pip"],
      });
      renderWithProviders(<Results />, { store, route: `/results/${latest.id}`, path: "/results/:scanId?" });

      await userEvent.click(screen.getByRole("button", { name: /Richieste inviate e mai accettate/ }));

      const flagged = (name: string) =>
        within(screen.getByRole("list", { name }))
          .getAllByRole("listitem")
          .filter((li) => li.getAttribute("data-new") === "true")
          .map((li) => li.textContent);

      expect(flagged("Unfollowers")).toEqual(["zed"]);
      expect(flagged("Richieste inviate e mai accettate")).toEqual(["pip"]);
    });

    it("non evidenzia le sezioni extra se la scansione precedente non le aveva", async () => {
      const store = createStore();
      store.set(addScanToHistoryAtom, { ...base, unfollowers: ["eve"], pendingRequests: [] });
      const latest = store.set(addScanToHistoryAtom, {
        ...base,
        unfollowers: ["eve", "zed"],
        pendingRequests: ["pam"],
      });
      renderWithProviders(<Results />, { store, route: `/results/${latest.id}`, path: "/results/:scanId?" });

      await userEvent.click(screen.getByRole("button", { name: /Richieste inviate e mai accettate/ }));

      // "pam" non è confrontabile: la lista precedente vuota può voler dire
      // che quel file non era nell'export. Resta evidenziato solo "zed".
      expect(document.querySelectorAll('[data-new="true"]')).toHaveLength(1);
      expect(screen.getByRole("list", { name: "Unfollowers" }).querySelector('[data-new="true"]')).toHaveTextContent(
        "zed",
      );
    });

    it("confronta con la scansione subito precedente, non con la più recente", () => {
      const store = createStore();
      store.set(addScanToHistoryAtom, { ...base, unfollowers: ["eve"], pendingRequests: [] });
      const middle = store.set(addScanToHistoryAtom, {
        ...base,
        unfollowers: ["eve", "zed"],
        pendingRequests: [],
      });
      store.set(addScanToHistoryAtom, {
        ...base,
        unfollowers: ["eve", "zed", "mallory"],
        pendingRequests: [],
      });

      // Aperta dalla cronologia, una scansione di mezzo si confronta con quella più vecchia.
      renderWithProviders(<Results />, { store, route: `/results/${middle.id}`, path: "/results/:scanId?" });

      const flagged = within(screen.getByRole("list", { name: "Unfollowers" }))
        .getAllByRole("listitem")
        .filter((li) => li.getAttribute("data-new") === "true")
        .map((li) => li.textContent);

      expect(flagged).toEqual(["zed"]);
    });

    it("con una sola scansione non evidenzia nessuno", () => {
      const { store, record } = seed();
      renderWithProviders(<Results />, { store, route: `/results/${record.id}`, path: "/results/:scanId?" });

      expect(document.querySelectorAll('[data-new="true"]')).toHaveLength(0);
    });
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

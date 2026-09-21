import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "jotai";
import { describe, expect, it, vi } from "vitest";
import { addScanToHistoryAtom } from "@/features/scan/store/scanAtoms";
import { renderWithProviders } from "@/test/renderWithProviders";
import ScanHistoryList from "./ScanHistoryList";

const seedHistory = (count: number) => {
  const store = createStore();
  const records = Array.from({ length: count }, (_, i) =>
    store.set(addScanToHistoryAtom, {
      followers: [],
      following: [],
      unfollowers: Array.from({ length: i + 1 }, (_, j) => `u${j}`),
      pendingRequests: [],
      removedSuggestions: [],
    }),
  );
  return { store, records };
};

describe("ScanHistoryList", () => {
  it("mostra lo stato vuoto senza scansioni", () => {
    renderWithProviders(<ScanHistoryList />);
    expect(screen.getByText("Nessuna scansione salvata")).toBeInTheDocument();
  });

  it("elenca le scansioni dalla più recente con il numero di unfollowers", () => {
    const { store } = seedHistory(3);
    renderWithProviders(<ScanHistoryList />, { store });

    const list = screen.getByRole("list", { name: "Ultime scansioni" });
    const items = within(list).getAllByRole("button");

    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("3 non ti seguono");
    expect(items[2]).toHaveTextContent("1 non ti segue");
  });

  it("al click apre i risultati della scansione e chiude il drawer", async () => {
    const { store, records } = seedHistory(2);
    const onNavigate = vi.fn();
    renderWithProviders(<ScanHistoryList onNavigate={onNavigate} />, { store, path: "/" });

    const list = screen.getByRole("list", { name: "Ultime scansioni" });
    await userEvent.click(within(list).getAllByRole("button")[1]);

    expect(onNavigate).toHaveBeenCalledOnce();
    expect(screen.getByTestId("location")).toHaveTextContent(`/results/${records[0].id}`);
  });

  it("evidenzia la scansione attualmente aperta", () => {
    const { store, records } = seedHistory(2);
    renderWithProviders(<ScanHistoryList />, {
      store,
      route: `/results/${records[1].id}`,
      path: "/results/:scanId",
    });

    const list = screen.getByRole("list", { name: "Ultime scansioni" });
    const [selected, other] = within(list).getAllByRole("button");
    expect(selected).toHaveClass("Mui-selected");
    expect(other).not.toHaveClass("Mui-selected");
  });
});

import { act, screen } from "@testing-library/react";
import { createStore } from "jotai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { addScanToHistoryAtom } from "@/features/scan/store/scanAtoms";
import { renderWithProviders } from "@/test/renderWithProviders";
import LoadingScreen from "./LoadingScreen";
import { LOADING_MIN_DURATION_MS } from "./loadingTips";

describe("LoadingScreen", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("dopo il tempo minimo apre i risultati della scansione", () => {
    const store = createStore();
    const record = store.set(addScanToHistoryAtom, {
      followers: [],
      following: [],
      unfollowers: [],
      pendingRequests: [],
      removedSuggestions: [],
    });

    renderWithProviders(<LoadingScreen />, { store, route: `/loading/${record.id}`, path: "/loading/:scanId" });

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(LOADING_MIN_DURATION_MS));

    expect(screen.getByTestId("location")).toHaveTextContent(`/results/${record.id}`);
  });

  it("con id sconosciuto torna subito alla home", () => {
    renderWithProviders(<LoadingScreen />, { route: "/loading/nope", path: "/loading/:scanId" });
    expect(screen.getByTestId("location")).toHaveTextContent("/");
  });
});

import { act, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/renderWithProviders";
import AnalysisOverlay from "./AnalysisOverlay";
import { LOADING_MIN_DURATION_MS } from "./loadingTips";

describe("AnalysisOverlay", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("mostra il caricamento e avvisa quando l'attesa minima è finita", () => {
    const onDone = vi.fn();
    renderWithProviders(<AnalysisOverlay open onDone={onDone} />);

    expect(screen.getByRole("progressbar", { name: "Analisi in corso" })).toBeInTheDocument();
    expect(onDone).not.toHaveBeenCalled();

    act(() => vi.advanceTimersByTime(LOADING_MIN_DURATION_MS));

    expect(onDone).toHaveBeenCalledOnce();
  });

  it("da chiuso non mostra nulla e non fa partire il timer", () => {
    const onDone = vi.fn();
    renderWithProviders(<AnalysisOverlay open={false} onDone={onDone} />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(LOADING_MIN_DURATION_MS));

    expect(onDone).not.toHaveBeenCalled();
  });
});

import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "jotai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/test/renderWithProviders";
import { showToastAtom, TOAST_DURATION_MS } from "./toastAtoms";

/** `renderWithProviders` monta già la ToastRegion dell'app: qui serve solo il toast. */
const renderToast = (message: string) => {
  const store = createStore();
  store.set(showToastAtom, { message });
  renderWithProviders(<div />, { store });
};

describe("ToastRegion", () => {
  beforeEach(() => vi.useFakeTimers({ shouldAdvanceTime: true }));
  afterEach(() => vi.useRealTimers());

  it("chiude il toast da solo dopo la durata prevista", () => {
    renderToast("ciao");
    expect(screen.getByText("ciao")).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS));

    expect(screen.queryByText("ciao")).not.toBeInTheDocument();
  });

  it("tiene il countdown in pausa finché il puntatore è sopra", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderToast("ciao");

    await user.hover(screen.getByRole("status"));
    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS * 2));
    expect(screen.getByText("ciao")).toBeInTheDocument();

    await user.unhover(screen.getByRole("status"));
    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS));
    expect(screen.queryByText("ciao")).not.toBeInTheDocument();
  });
});

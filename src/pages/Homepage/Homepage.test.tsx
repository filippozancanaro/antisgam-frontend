import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LOADING_MIN_DURATION_MS } from "@/features/scan/components/loadingTips";
import { scanHistoryAtom } from "@/features/scan/store/scanAtoms";
import { buildExportZip } from "@/test/buildExportZip";
import { EXPECTED } from "@/test/fixtures";
import { renderWithProviders } from "@/test/renderWithProviders";
import Homepage from "./Homepage";

const fileInput = () => screen.getByLabelText("File di dati da Instagram (input)");

describe("Homepage", () => {
  afterEach(() => vi.useRealTimers());

  it("carica lo zip, esegue l'analisi, la salva in cronologia e mostra l'overlay", async () => {
    const { store } = renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.upload(fileInput(), await buildExportZip());

    expect(await screen.findByText("instagram-export.zip")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "ANDIAMO!" }));

    const [record] = store.get(scanHistoryAtom);
    expect(record.data.unfollowers).toEqual(EXPECTED.unfollowers);
    expect(record.data.pendingRequests).toEqual(EXPECTED.pendingRequests);
    expect(record.data.removedSuggestions).toEqual(EXPECTED.removedSuggestions);

    // L'analisi non è più una rotta: resta sulla home con l'overlay sopra.
    expect(screen.getByRole("progressbar", { name: "Analisi in corso" })).toBeInTheDocument();
    expect(screen.queryByTestId("location")).not.toBeInTheDocument();
  });

  it("al termine dell'attesa l'overlay lascia il posto ai risultati", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    const { store } = renderWithProviders(<Homepage />, { path: "/" });

    await user.upload(fileInput(), await buildExportZip());
    expect(await screen.findByText("instagram-export.zip")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "ANDIAMO!" }));

    const [record] = store.get(scanHistoryAtom);
    act(() => vi.advanceTimersByTime(LOADING_MIN_DURATION_MS));

    expect(screen.getByTestId("location")).toHaveTextContent(`/results/${record.id}`);
  });

  it("blocca l'analisi senza dati caricati", async () => {
    const { store } = renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.click(screen.getByRole("button", { name: "ANDIAMO!" }));

    expect(await screen.findByText(/Dati sui Followers o Following mancanti/)).toBeInTheDocument();
    expect(store.get(scanHistoryAtom)).toEqual([]);
    expect(screen.queryByTestId("location")).not.toBeInTheDocument();
  });

  it("segnala uno zip senza followers e annulla la selezione", async () => {
    renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.upload(fileInput(), await buildExportZip({ includeFollowers: false }));

    expect(await screen.findByText(/Nessun file json "followers"/)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText("instagram-export.zip")).not.toBeInTheDocument());
  });

  it("mostra i warning per i file opzionali mancanti ma accetta lo zip", async () => {
    renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.upload(fileInput(), await buildExportZip({ includePending: false }));

    expect(await screen.findByText(/Richieste Inviate/)).toBeInTheDocument();
    expect(await screen.findByText("instagram-export.zip")).toBeInTheDocument();
  });

  it("rifiuta file che non sono zip", async () => {
    renderWithProviders(<Homepage />, { path: "/" });

    const input = fileInput() as HTMLInputElement;
    await userEvent.upload(input, new File(["{}"], "followers.json", { type: "application/json" }), {
      applyAccept: false,
    });

    expect(await screen.findByText(/non è uno zip/)).toBeInTheDocument();
  });

  it("'ricominciamo' pulisce la selezione", async () => {
    renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.upload(fileInput(), await buildExportZip());
    expect(await screen.findByText("instagram-export.zip")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /ricominciamo/ }));

    expect(await screen.findByText("Applicazione resettata.")).toBeInTheDocument();
    expect(screen.queryByText("instagram-export.zip")).not.toBeInTheDocument();
  });

  it("apre il tutorial", async () => {
    renderWithProviders(<Homepage />, { path: "/" });

    await userEvent.click(screen.getByRole("button", { name: /Spiegami tutto/ }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/COME RECUPERARE I DATI/)).toBeInTheDocument();
  });
});

import { createStore } from "jotai";
import { describe, expect, it } from "vitest";
import { fixtures } from "@/test/fixtures";
import { readMountedAtom } from "@/test/readMountedAtom";
import type { ScanResult } from "../model/types";
import { normalizeHistory } from "./historyStorage";
import {
  addScanToHistoryAtom,
  clearScanHistoryAtom,
  SCAN_HISTORY_LIMIT,
  SCAN_HISTORY_STORAGE_KEY,
  scanHistoryAtom,
} from "./scanAtoms";

const scan = (n: number): ScanResult => ({
  followers: [`f${n}`],
  following: [`f${n}`, `u${n}`],
  unfollowers: [`u${n}`],
  pendingRequests: [],
  removedSuggestions: [],
});

describe("scanHistoryAtom", () => {
  it("aggiunge in testa e limita la cronologia", () => {
    const store = createStore();

    const first = store.set(addScanToHistoryAtom, scan(1));
    store.set(addScanToHistoryAtom, scan(2));

    expect(store.get(scanHistoryAtom).map((record) => record.data.unfollowers[0])).toEqual(["u2", "u1"]);
    expect(store.get(scanHistoryAtom)[1].id).toBe(first.id);

    for (let i = 3; i <= SCAN_HISTORY_LIMIT + 5; i++) store.set(addScanToHistoryAtom, scan(i));
    expect(store.get(scanHistoryAtom)).toHaveLength(SCAN_HISTORY_LIMIT);
  });

  it("persiste nel localStorage e rilegge il formato corrente", () => {
    const store = createStore();
    const record = store.set(addScanToHistoryAtom, scan(1));

    const raw = JSON.parse(localStorage.getItem(SCAN_HISTORY_STORAGE_KEY) ?? "null");
    expect(raw).toEqual([record]);

    expect(readMountedAtom(scanHistoryAtom)).toEqual([record]);
  });

  it("migra il formato legacy salvato dalle versioni precedenti", () => {
    localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify(fixtures.legacyHistory));

    const history = readMountedAtom(scanHistoryAtom);

    expect(history).toHaveLength(2);
    expect(history[0]).toEqual({
      id: "1700000000000",
      timestamp: 1700000000000,
      data: {
        followers: ["alice", "bob"],
        following: ["alice", "bob", "zed"],
        unfollowers: ["zed"],
        pendingRequests: ["private_pam"],
        removedSuggestions: [],
      },
    });
  });

  it("scarta dati corrotti nel localStorage senza rompere l'app", () => {
    localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, "{not json");
    expect(readMountedAtom(scanHistoryAtom)).toEqual([]);

    localStorage.setItem(SCAN_HISTORY_STORAGE_KEY, JSON.stringify([{ timestamp: "no" }, 42, null]));
    expect(readMountedAtom(scanHistoryAtom)).toEqual([]);
  });

  it("clearScanHistoryAtom svuota la cronologia", () => {
    const store = createStore();
    store.set(addScanToHistoryAtom, scan(1));
    store.set(clearScanHistoryAtom);
    expect(store.get(scanHistoryAtom)).toEqual([]);
  });
});

describe("normalizeHistory", () => {
  it("ordina per timestamp decrescente e deduplica per id", () => {
    const a = { id: "a", timestamp: 1, data: scan(1) };
    const b = { id: "b", timestamp: 2, data: scan(2) };
    expect(normalizeHistory([a, b, a]).map((record) => record.id)).toEqual(["b", "a"]);
  });
});

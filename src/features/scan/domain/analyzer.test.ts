import { describe, expect, it } from "vitest";
import { analyzeScan, sortNicknames } from "./analyzer";

describe("analyzeScan", () => {
  it("calcola gli unfollowers come following non presenti tra i followers", () => {
    const result = analyzeScan({
      followers: ["alice", "bob"],
      following: ["zed", "alice", "eve", "bob"],
      pendingRequests: [],
      removedSuggestions: [],
    });

    expect(result.unfollowers).toEqual(["eve", "zed"]);
  });

  it("deduplica e ordina tutte le liste", () => {
    const result = analyzeScan({
      followers: ["b", "a", "b"],
      following: ["c", "a", "c"],
      pendingRequests: ["y", "x", "x"],
      removedSuggestions: ["q", "p"],
    });

    expect(result).toEqual({
      followers: ["a", "b"],
      following: ["a", "c"],
      unfollowers: ["c"],
      pendingRequests: ["x", "y"],
      removedSuggestions: ["p", "q"],
    });
  });

  it("gestisce liste vuote", () => {
    const empty = { followers: [], following: [], pendingRequests: [], removedSuggestions: [] };
    expect(analyzeScan(empty).unfollowers).toEqual([]);
  });

  it("sortNicknames usa un ordinamento locale-aware", () => {
    expect(sortNicknames(["Zeta", "alpha", "Beta"])).toEqual(["alpha", "Beta", "Zeta"]);
  });
});

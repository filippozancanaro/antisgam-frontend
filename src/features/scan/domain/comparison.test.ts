import { describe, expect, it } from "vitest";
import { findNewNicknames } from "./comparison";

describe("findNewNicknames", () => {
  it("ritorna i nickname presenti solo nella scansione corrente", () => {
    expect([...findNewNicknames(["alice", "bob", "eve"], ["alice", "zed"])]).toEqual(["bob", "eve"]);
  });

  it("ritorna un insieme vuoto se non c'è una scansione precedente", () => {
    expect(findNewNicknames(["alice", "bob"], undefined).size).toBe(0);
  });

  it("ritorna un insieme vuoto se non cambia nulla o la corrente è vuota", () => {
    expect(findNewNicknames(["alice"], ["alice", "bob"]).size).toBe(0);
    expect(findNewNicknames([], ["alice"]).size).toBe(0);
  });

  it("tratta ogni nickname come nuovo se la precedente è vuota", () => {
    expect([...findNewNicknames(["alice", "bob"], [])]).toEqual(["alice", "bob"]);
  });
});

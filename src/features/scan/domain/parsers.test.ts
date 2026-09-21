import { describe, expect, it } from "vitest";
import { fixtures } from "@/test/fixtures";
import {
  collectNicknames,
  parseFollowers,
  parseFollowing,
  parsePendingRequests,
  parseRemovedSuggestions,
  safeJsonParse,
} from "./parsers";

describe("parsers", () => {
  it("parseFollowers estrae i nickname da string_list_data.value, senza duplicati", () => {
    expect(parseFollowers(fixtures.followers1)).toEqual(["alice", "bob", "carol"]);
  });

  it("parseFollowing usa title (o value quando presente)", () => {
    expect(parseFollowing(fixtures.following)).toEqual(["alice", "bob", "zed", "eve"]);
  });

  it("parsePendingRequests e parseRemovedSuggestions leggono i rispettivi wrapper", () => {
    expect(parsePendingRequests(fixtures.pendingFollowRequests)).toEqual(["private_pam"]);
    expect(parseRemovedSuggestions(fixtures.removedSuggestions)).toEqual(["spam_sam", "ad_amy"]);
  });

  describe("formato label_values (export 2026)", () => {
    it("legge pending_follow_requests come oggetto singolo", () => {
      expect(parsePendingRequests(fixtures.pendingFollowRequests2026)).toEqual(["private_pam"]);
    });

    it("legge removed_suggestions come array a livello root", () => {
      expect(parseRemovedSuggestions(fixtures.removedSuggestions2026)).toEqual(["spam_sam", "ad_amy"]);
    });

    const entry = (labelValues: Array<{ label: string; value: string }>) => [{ timestamp: 1, media: [], label_values: labelValues }];

    it("riconosce l'etichetta username in altre lingue", () => {
      expect(collectNicknames(entry([{ label: "Username", value: "john_doe" }]))).toEqual(["john_doe"]);
      expect(collectNicknames(entry([{ label: "Nombre de usuario", value: "juan.perez" }]))).toEqual(["juan.perez"]);
    });

    it("senza etichetta nota usa la URL del profilo", () => {
      expect(
        collectNicknames(entry([{ label: "Link", value: "https://www.instagram.com/_u/from_url/" }, { label: "Name", value: "Display Name" }])),
      ).toEqual(["from_url"]);
    });

    it("come ultimo fallback prende il valore che somiglia a uno username, non il nome visualizzato", () => {
      expect(
        collectNicknames(entry([{ label: "URL", value: "" }, { label: "Name", value: "Mario Rossi" }, { label: "???", value: "mario.rossi_92" }])),
      ).toEqual(["mario.rossi_92"]);
      expect(collectNicknames(entry([{ label: "Name", value: "Solo Nome Visualizzato" }]))).toEqual([]);
    });

    it("accetta anche followers/following nel nuovo formato", () => {
      expect(parseFollowers(entry([{ label: "Nome utente", value: "alice" }]))).toEqual(["alice"]);
      expect(parseFollowing({ timestamp: 1, label_values: [{ label: "Username", value: "bob" }] })).toEqual(["bob"]);
    });
  });

  it("ignora input malformati senza lanciare", () => {
    expect(parseFollowers(null)).toEqual([]);
    expect(parseFollowers({ not: "an array" })).toEqual([]);
    expect(parseFollowers([null, 42, "str", { string_list_data: "nope" }])).toEqual([]);
    expect(parseFollowing([])).toEqual([]);
    expect(parseFollowing({ relationships_following: null })).toEqual([]);
    expect(parsePendingRequests("x")).toEqual([]);
    expect(parseRemovedSuggestions(undefined)).toEqual([]);
  });

  it("scarta value vuoti e fa il trim", () => {
    expect(
      collectNicknames([
        { string_list_data: [{ value: "  padded  " }, { value: "" }, { value: null }] },
        { title: "   " },
        { title: "only_title" },
      ]),
    ).toEqual(["padded", "only_title"]);
  });

  it("safeJsonParse ritorna undefined su JSON non valido", () => {
    expect(safeJsonParse("{bad json")).toBeUndefined();
    expect(safeJsonParse('{"ok":true}')).toEqual({ ok: true });
  });
});

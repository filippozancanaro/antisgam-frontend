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

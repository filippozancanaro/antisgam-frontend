import { describe, expect, it } from "vitest";
import { isFileAccepted } from "./fileAccept";

const file = (name: string, type: string) => new File([""], name, { type });

describe("isFileAccepted", () => {
  it("accetta per MIME type esatto", () => {
    expect(isFileAccepted(file("a.zip", "application/zip"), ["application/zip"])).toBe(true);
    expect(isFileAccepted(file("a.json", "application/json"), ["application/zip"])).toBe(false);
  });

  it("accetta per estensione anche se il browser non fornisce il MIME type", () => {
    expect(isFileAccepted(file("export.ZIP", ""), [".zip"])).toBe(true);
    expect(isFileAccepted(file("export.tar", ""), [".zip"])).toBe(false);
  });

  it("supporta i wildcard e liste vuote", () => {
    expect(isFileAccepted(file("x.png", "image/png"), ["image/*"])).toBe(true);
    expect(isFileAccepted(file("x.png", "image/png"), [])).toBe(true);
    expect(isFileAccepted(file("x.png", "image/png"), null)).toBe(true);
  });
});

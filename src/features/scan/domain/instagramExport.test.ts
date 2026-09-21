import { describe, expect, it } from "vitest";
import { buildExportZip } from "@/test/buildExportZip";
import { EXPECTED } from "@/test/fixtures";
import { InstagramExportError, readInstagramExport } from "./instagramExport";

const expectCode = async (promise: Promise<unknown>, code: InstagramExportError["code"]) => {
  await expect(promise).rejects.toBeInstanceOf(InstagramExportError);
  await expect(promise).rejects.toMatchObject({ code });
};

describe("readInstagramExport", () => {
  it("estrae tutte le liste da un export completo (followers su più file)", async () => {
    const file = await buildExportZip();
    const { input, warnings } = await readInstagramExport(file);

    expect(input.followers.sort()).toEqual(EXPECTED.followers);
    expect(input.following.sort()).toEqual(EXPECTED.following);
    expect(input.pendingRequests).toEqual(EXPECTED.pendingRequests);
    expect(input.removedSuggestions.sort()).toEqual(EXPECTED.removedSuggestions);
    expect(warnings).toEqual([]);
  });

  it("legge pending e removed_suggestions nel formato label_values (export 2026)", async () => {
    const file = await buildExportZip({ format: "2026" });
    const { input, warnings } = await readInstagramExport(file);

    expect(input.pendingRequests).toEqual(EXPECTED.pendingRequests);
    expect(input.removedSuggestions.sort()).toEqual(EXPECTED.removedSuggestions);
    expect(warnings).toEqual([]);
  });

  it("tollera una cartella radice extra nello zip", async () => {
    const file = await buildExportZip({ rootFolder: "instagram-user-2025-01-01" });
    const { input } = await readInstagramExport(file);
    expect(input.followers.sort()).toEqual(EXPECTED.followers);
  });

  it("segnala come warning l'assenza dei file opzionali", async () => {
    const file = await buildExportZip({ includePending: false, includeRemoved: false });
    const { input, warnings } = await readInstagramExport(file);

    expect(warnings).toEqual(["pending-missing", "removed-suggestions-missing"]);
    expect(input.pendingRequests).toEqual([]);
    expect(input.removedSuggestions).toEqual([]);
  });

  it("fallisce se mancano followers o following", async () => {
    await expectCode(readInstagramExport(await buildExportZip({ includeFollowers: false })), "followers-missing");
    await expectCode(readInstagramExport(await buildExportZip({ includeFollowing: false })), "following-missing");
  });

  it("fallisce con invalid-zip su un file che non è uno zip", async () => {
    const file = new File(["not a zip"], "fake.zip", { type: "application/zip" });
    await expectCode(readInstagramExport(file), "invalid-zip");
  });

  it("fallisce con invalid-json se un file atteso non è JSON", async () => {
    const file = await buildExportZip({
      extraEntries: { "connections/followers_and_following/following.json": "{broken" },
    });
    await expectCode(readInstagramExport(file), "invalid-json");
  });

  it("ignora file in sottocartelle o con nomi non attesi", async () => {
    const file = await buildExportZip({
      extraEntries: {
        "connections/followers_and_following/nested/followers_9.json": JSON.stringify([
          { string_list_data: [{ value: "should_not_appear" }] },
        ]),
        "connections/followers_and_following/followers_backup.txt": "[]",
      },
    });
    const { input } = await readInstagramExport(file);
    expect(input.followers).not.toContain("should_not_appear");
  });
});

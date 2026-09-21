import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { findZipEntries, getZipEntrySize, readZipEntryText, ZipEntryTooLargeError } from "./zip";

const makeZip = async (entries: Record<string, string>) => {
  const zip = new JSZip();
  Object.entries(entries).forEach(([path, content]) => zip.file(path, content));
  // Round-trip per avere entry "caricate" con i metadati di dimensione.
  return JSZip.loadAsync(await zip.generateAsync({ type: "uint8array" }));
};

describe("zip utils", () => {
  it("findZipEntries trova solo i file diretti della cartella richiesta", async () => {
    const zip = await makeZip({
      "a/b/followers_1.json": "[]",
      "root/a/b/followers_2.json": "[]",
      "a/b/deeper/followers_3.json": "[]",
      "xa/b/followers_4.json": "[]",
      "a/b/following.json": "{}",
    });

    const names = findZipEntries(zip, ["a", "b"], { nameStartsWith: "followers", nameEndsWith: ".json" }).map(
      (entry) => entry.name,
    );

    expect(names.sort()).toEqual(["a/b/followers_1.json", "root/a/b/followers_2.json"]);
  });

  it("readZipEntryText rispetta il limite di dimensione", async () => {
    const zip = await makeZip({ "big.json": "x".repeat(2048) });
    const [entry] = findZipEntries(zip, [], { nameStartsWith: "big", nameEndsWith: ".json" });

    expect(getZipEntrySize(entry)).toBe(2048);
    await expect(readZipEntryText(entry, 1024)).rejects.toBeInstanceOf(ZipEntryTooLargeError);
    await expect(readZipEntryText(entry, 4096)).resolves.toHaveLength(2048);
  });
});

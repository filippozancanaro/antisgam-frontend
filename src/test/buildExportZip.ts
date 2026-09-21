import JSZip from "jszip";
import { EXPORT_FOLDER } from "@/features/scan/domain/instagramExport";
import { fixtures } from "./fixtures";

export interface ExportZipOptions {
  /** Cartella radice extra (es. "instagram-user-2025") per simulare export "avvolti". */
  rootFolder?: string;
  includeFollowers?: boolean;
  includeFollowing?: boolean;
  includePending?: boolean;
  includeRemoved?: boolean;
  /** Entry aggiuntive `{ path: contenuto }`, sovrascrivono quelle standard. */
  extraEntries?: Record<string, string>;
  /** Formato dei file opzionali: "legacy" (wrapper + string_list_data) o "2026" (label_values). */
  format?: "legacy" | "2026";
}

/** Costruisce in memoria uno zip con la struttura dell'export Instagram. */
export const buildExportZip = async ({
  rootFolder,
  includeFollowers = true,
  includeFollowing = true,
  includePending = true,
  includeRemoved = true,
  extraEntries = {},
  format = "legacy",
}: ExportZipOptions = {}): Promise<File> => {
  const zip = new JSZip();
  const base = [rootFolder, ...EXPORT_FOLDER].filter(Boolean).join("/");
  const add = (name: string, content: unknown) => zip.file(`${base}/${name}`, JSON.stringify(content));

  if (includeFollowers) {
    add("followers_1.json", fixtures.followers1);
    add("followers_2.json", fixtures.followers2);
  }
  if (includeFollowing) add("following.json", fixtures.following);
  const is2026 = format === "2026";
  if (includePending) {
    add("pending_follow_requests.json", is2026 ? fixtures.pendingFollowRequests2026 : fixtures.pendingFollowRequests);
  }
  if (includeRemoved) {
    add("removed_suggestions.json", is2026 ? fixtures.removedSuggestions2026 : fixtures.removedSuggestions);
  }

  Object.entries(extraEntries).forEach(([path, content]) => zip.file(path, content));

  const buffer = await zip.generateAsync({ type: "arraybuffer" });
  return new File([buffer], "instagram-export.zip", { type: "application/zip" });
};

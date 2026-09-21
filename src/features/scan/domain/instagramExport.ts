import {
  findZipEntries,
  openZip,
  readZipEntryText,
  ZipEntryTooLargeError,
  type ZipEntry,
} from "@/shared/utils/zip";
import type { ScanInput } from "../model/types";
import {
  parseFollowers,
  parseFollowing,
  parsePendingRequests,
  parseRemovedSuggestions,
  safeJsonParse,
} from "./parsers";

/** Cartella dell'export Meta che contiene i JSON di interesse. */
export const EXPORT_FOLDER = ["connections", "followers_and_following"];

/** Limite per singolo JSON: protegge da zip "bomba" senza penalizzare export reali (pochi MB). */
export const MAX_JSON_ENTRY_BYTES = 50 * 1024 * 1024;

export const ZIP_MIME_TYPES = ["application/zip", "application/x-zip-compressed"];
export const ZIP_ACCEPT = [...ZIP_MIME_TYPES, ".zip"];

export type ExportErrorCode =
  | "invalid-zip"
  | "followers-missing"
  | "following-missing"
  | "invalid-json"
  | "entry-too-large";

export type ExportWarningCode = "pending-missing" | "removed-suggestions-missing";

export class InstagramExportError extends Error {
  readonly code: ExportErrorCode;

  constructor(code: ExportErrorCode, message?: string) {
    super(message ?? code);
    this.name = "InstagramExportError";
    this.code = code;
  }
}

export interface InstagramExportReadResult {
  input: ScanInput;
  warnings: ExportWarningCode[];
}

const readJsonEntries = async (entries: ZipEntry[]): Promise<unknown[]> => {
  let contents: string[];
  try {
    contents = await Promise.all(entries.map((entry) => readZipEntryText(entry, MAX_JSON_ENTRY_BYTES)));
  } catch (error) {
    if (error instanceof ZipEntryTooLargeError) throw new InstagramExportError("entry-too-large", error.message);
    throw new InstagramExportError("invalid-zip", error instanceof Error ? error.message : undefined);
  }

  return contents.map((text) => {
    const parsed = safeJsonParse(text);
    if (parsed === undefined) throw new InstagramExportError("invalid-json");
    return parsed;
  });
};

const parseAll = (files: unknown[], parser: (json: unknown) => string[]): string[] =>
  Array.from(new Set(files.flatMap(parser)));

/**
 * Legge lo zip esportato da Instagram e ne estrae le liste di nickname.
 * Followers e following sono obbligatori; richieste pendenti e suggerimenti rimossi
 * sono opzionali e la loro assenza viene segnalata come warning.
 */
export const readInstagramExport = async (file: File): Promise<InstagramExportReadResult> => {
  let zip: Awaited<ReturnType<typeof openZip>>;
  try {
    zip = await openZip(file);
  } catch (error) {
    throw new InstagramExportError("invalid-zip", error instanceof Error ? error.message : undefined);
  }

  const find = (prefix: string) =>
    findZipEntries(zip, EXPORT_FOLDER, { nameStartsWith: prefix, nameEndsWith: ".json" });

  const followersEntries = find("followers");
  if (followersEntries.length === 0) throw new InstagramExportError("followers-missing");

  const followingEntries = find("following");
  if (followingEntries.length === 0) throw new InstagramExportError("following-missing");

  const pendingEntries = find("pending_follow_requests");
  const removedEntries = find("removed_suggestions");

  const warnings: ExportWarningCode[] = [];
  if (pendingEntries.length === 0) warnings.push("pending-missing");
  if (removedEntries.length === 0) warnings.push("removed-suggestions-missing");

  const [followersJson, followingJson, pendingJson, removedJson] = await Promise.all([
    readJsonEntries(followersEntries),
    readJsonEntries(followingEntries),
    readJsonEntries(pendingEntries),
    readJsonEntries(removedEntries),
  ]);

  return {
    input: {
      followers: parseAll(followersJson, parseFollowers),
      following: parseAll(followingJson, parseFollowing),
      pendingRequests: parseAll(pendingJson, parsePendingRequests),
      removedSuggestions: parseAll(removedJson, parseRemovedSuggestions),
    },
    warnings,
  };
};

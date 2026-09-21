import JSZip from "jszip";

export type ZipEntry = JSZip.JSZipObject;

/** Apre uno zip in memoria. Lancia se il file non è uno zip valido. */
export const openZip = async (file: File): Promise<JSZip> =>
  JSZip.loadAsync(await file.arrayBuffer());

/**
 * Dimensione decompressa dichiarata nel central directory dello zip, se disponibile.
 * JSZip non la espone pubblicamente: la leggiamo dal campo interno con un guard.
 */
export const getZipEntrySize = (entry: ZipEntry): number | null => {
  const data = (entry as unknown as { _data?: { uncompressedSize?: unknown } })._data;
  return typeof data?.uncompressedSize === "number" ? data.uncompressedSize : null;
};

export class ZipEntryTooLargeError extends Error {
  readonly entryName: string;
  readonly size: number;
  readonly limit: number;

  constructor(entryName: string, size: number, limit: number) {
    super(`Zip entry "${entryName}" is ${size} bytes, limit is ${limit}`);
    this.name = "ZipEntryTooLargeError";
    this.entryName = entryName;
    this.size = size;
    this.limit = limit;
  }
}

/** Legge un'entry come testo, rifiutandola prima della decompressione se supera `maxBytes`. */
export const readZipEntryText = async (entry: ZipEntry, maxBytes: number): Promise<string> => {
  const size = getZipEntrySize(entry);
  if (size !== null && size > maxBytes) throw new ZipEntryTooLargeError(entry.name, size, maxBytes);

  const text = await entry.async("string");
  if (text.length > maxBytes) throw new ZipEntryTooLargeError(entry.name, text.length, maxBytes);
  return text;
};

export interface ZipNameFilter {
  nameStartsWith: string;
  nameEndsWith: string;
}

/**
 * Trova i file direttamente contenuti nella cartella `folder` (in qualsiasi punto dello zip,
 * così da tollerare un'eventuale cartella radice extra) il cui nome rispetta il filtro.
 */
export const findZipEntries = (zip: JSZip, folder: string[], filter: ZipNameFilter): ZipEntry[] => {
  const folderPath = folder.join("/");
  const marker = folderPath === "" ? "" : `${folderPath}/`;

  return Object.values(zip.files).filter((entry) => {
    if (entry.dir) return false;

    const markerIndex = marker === "" ? 0 : entry.name.indexOf(marker);
    if (markerIndex < 0) return false;
    if (markerIndex > 0 && entry.name[markerIndex - 1] !== "/") return false;

    const baseName = entry.name.slice(markerIndex + marker.length);
    if (baseName === "" || baseName.includes("/")) return false;

    return baseName.startsWith(filter.nameStartsWith) && baseName.endsWith(filter.nameEndsWith);
  });
};

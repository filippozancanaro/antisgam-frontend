import JSZip from 'jszip';

/**
 * Verifica e decomprime un file ZIP.
 * @param file - File .zip da aprire
 * @returns Istanza di JSZip con tutti i file mappati
 */
export const unzipZipFile = async (file: File): Promise<JSZip | null> => {
  if (!file || !file.name.endsWith('.zip')) return null;

  try {
    const zip = await JSZip.loadAsync(file);
    return zip;
  } catch (error) {
    console.error('Errore durante decompressione ZIP:', error);
    return null;
  }
};

/**
 * Naviga lo ZIP e restituisce i file in una cartella data da un array di path.
 * @param zip - Istanza JSZip
 * @param pathSegments - Array che descrive il percorso della cartella
 * @returns Array di JSZipObject (file che iniziano col path richiesto)
 */
export const getFolderFromZip = (
  zip: JSZip,
  pathSegments: string[]
): JSZip.JSZipObject[] => {
  if (!zip) return [];

  const path = pathSegments.join('/'); // es. "root/child/final"
  const prefix = path === '' ? '' : `${path}/`;

  const filesInFolder = Object.values(zip.files).filter((file) =>
    file.name.startsWith(prefix)
  );

  return filesInFolder;
};

/**
 * Filtra file in una cartella ZIP in base a nomi esatti o prefissi/suffissi.
 * @param zip - JSZip già decompresso
 * @param pathSegments - percorso interno alla cartella
 * @param fileNames - array di nomi precisi da cercare
 * @param findFiles - filtro per nome iniziale/finale
 * @returns Array di JSZipObject corrispondenti ai criteri
 */
export const getFilesFromZip = (
  zip: JSZip,
  pathSegments: string[],
  fileNames?: string[] | null,
  findFiles?: {
    nameStartsWith: string;
    nameEndsWith: string;
  } | null,
): JSZip.JSZipObject[] => {
  const folderFiles = getFolderFromZip(zip, pathSegments);

  // Usa fileNames se forniti
  if (fileNames && fileNames.length > 0) {
    return folderFiles.filter((file) =>
      fileNames.includes(file.name.split('/').pop() || '')
    );
  }

  // Usa findFiles se valido
  if (findFiles) {
    const { nameStartsWith, nameEndsWith } = findFiles;

    if (!nameStartsWith || !nameEndsWith) {
      console.error('[ZipHandler] findFiles deve avere ENTRAMBI nameStartsWith e nameEndsWith');
      return [];
    }

    return folderFiles.filter((file) => {
      const baseName = file.name.split('/').pop() || '';
      return baseName.startsWith(nameStartsWith) && baseName.endsWith(nameEndsWith);
    });
  }

  console.error('[ZipHandler] Parametri insufficienti per filtrare file');
  return [];
};

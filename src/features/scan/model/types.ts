/**
 * Liste di nickname estratte dall'export Instagram, prima dell'analisi.
 */
export interface ScanInput {
  /** chi ti segue */
  followers: string[];
  /** chi segui */
  following: string[];
  /** richieste di follow inviate e non ancora accettate */
  pendingRequests: string[];
  /** profili suggeriti che hai rimosso */
  removedSuggestions: string[];
}

/**
 * Risultato di una scansione: input normalizzato + unfollowers calcolati.
 */
export interface ScanResult extends ScanInput {
  /** chi segui ma non ti segue */
  unfollowers: string[];
}

/**
 * Scansione salvata nella cronologia.
 */
export interface ScanRecord {
  id: string;
  timestamp: number;
  data: ScanResult;
}

/*
 * Forme "grezze" dei JSON esportati da Instagram.
 * Tipizzate come parziali/nullable: sono input utente e non ci fidiamo della loro struttura.
 */
export interface InstagramStringListEntry {
  href?: string | null;
  value?: string | null;
  timestamp?: number | string | null;
}

export interface InstagramRelationship {
  title?: string | null;
  string_list_data?: InstagramStringListEntry[] | null;
}

export type InstagramFollowersFile = InstagramRelationship[];

export interface InstagramFollowingFile {
  relationships_following?: InstagramRelationship[] | null;
}

export interface InstagramPendingRequestsFile {
  relationships_follow_requests_sent?: InstagramRelationship[] | null;
}

export interface InstagramRemovedSuggestionsFile {
  relationships_dismissed_suggested_users?: InstagramRelationship[] | null;
}

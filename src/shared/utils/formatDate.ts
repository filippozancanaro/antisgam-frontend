const scanDateFormatter = new Intl.DateTimeFormat("it-IT", {
  dateStyle: "short",
  timeStyle: "short",
});

/** Data e ora di una scansione in formato locale (es. "21/09/26, 14:30"). */
export const formatScanDate = (timestamp: number): string => scanDateFormatter.format(new Date(timestamp));

/** Unisce classi CSS ignorando i valori falsy. */
export const cx = (...classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");

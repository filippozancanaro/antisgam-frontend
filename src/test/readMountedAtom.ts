import { createStore, type Atom } from "jotai";

/**
 * Legge un atomo dopo averlo "montato" (sottoscritto), come farebbe React:
 * per gli atomi con storage è il mount che innesca la lettura dal localStorage.
 */
export const readMountedAtom = <T>(atom: Atom<T>, store = createStore()): T => {
  const unsubscribe = store.sub(atom, () => {});
  const value = store.get(atom);
  unsubscribe();
  return value;
};

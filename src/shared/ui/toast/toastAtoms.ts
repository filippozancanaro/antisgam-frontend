import { atom } from "jotai";

export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
}

/** Massimo numero di toast visibili insieme: i più vecchi vengono scartati. */
export const MAX_VISIBLE_TOASTS = 3;

/** Durata di permanenza di un toast. */
export const TOAST_DURATION_MS = 6000;

export const toastsAtom = atom<ToastItem[]>([]);

let counter = 0;

export const showToastAtom = atom(
  null,
  (get, set, toast: { message: string; variant?: ToastVariant }): string => {
    counter += 1;
    const item: ToastItem = {
      id: `toast-${counter}`,
      message: toast.message,
      variant: toast.variant ?? "info",
    };
    set(toastsAtom, [...get(toastsAtom), item].slice(-MAX_VISIBLE_TOASTS));
    return item.id;
  },
);

export const dismissToastAtom = atom(null, (get, set, id: string) => {
  set(
    toastsAtom,
    get(toastsAtom).filter((toast) => toast.id !== id),
  );
});

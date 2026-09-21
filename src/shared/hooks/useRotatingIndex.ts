import { useEffect, useState } from "react";

const randomIndex = (count: number, exclude?: number): number => {
  if (count <= 1) return 0;
  let next = Math.floor(Math.random() * count);
  while (next === exclude) next = Math.floor(Math.random() * count);
  return next;
};

/** Indice casuale in `[0, count)` che cambia ogni `intervalMs` senza mai ripetersi consecutivamente. */
export const useRotatingIndex = (count: number, intervalMs: number): number => {
  const [index, setIndex] = useState(() => randomIndex(count));

  useEffect(() => {
    if (count <= 1) return;

    const interval = setInterval(() => setIndex((prev) => randomIndex(count, prev)), intervalMs);
    return () => clearInterval(interval);
  }, [count, intervalMs]);

  return Math.min(index, Math.max(count - 1, 0));
};

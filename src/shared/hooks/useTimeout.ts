import { useEffect, useRef } from "react";

/** Esegue `callback` una volta dopo `delayMs` (la callback più recente, senza riavviare il timer). */
export const useTimeout = (callback: () => void, delayMs: number) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const timer = setTimeout(() => callbackRef.current(), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);
};

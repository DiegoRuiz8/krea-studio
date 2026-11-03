import Lenis from "lenis";
import { useEffect, useState } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

let lenis: Lenis | null = null;

export const startSmoothScroll = () => {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }
  lenis = new Lenis({ autoRaf: true, anchors: { offset: 0 }, lerp: 0.11 });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
};

export const lockScroll = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.body.style.overflow = locked ? "hidden" : "";
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

/*
 * Progreso de la escena de Proceso, compartido entre las capas 3D y el texto.
 * `p` es el avance del contenedor fijado: 0 cuando se fija, 1 cuando se suelta.
 * Cada paso se completa en orden: el paso `i` termina en 1 antes que el `i + 1`.
 */
export const PROCESS_STEPS = 4;

export const processStep = (p: number, index: number) =>
  clamp01(((p + 0.1) / 0.85) * PROCESS_STEPS - index);

import { useEffect, useRef } from "react";
import { clamp01 } from "../lib/motion";

/*
 * Fondo de la página: una retícula de bloques que se desplaza en paralaje con
 * el scroll, se estira con la velocidad y se aparta del cursor. Parte de los
 * bloques se junta en figuras donde el layout lo pide:
 *   [data-dots="k"]     la K de Krea
 *   [data-dots="node"]  un nodo cuadrado (Proceso); su avance llega en data-g
 * El color sale del campo ([data-field]) sobre el que cae cada bloque.
 */

const K_MASK = [
  "XX...XX",
  "XX..XX.",
  "XX.XX..",
  "XXXX...",
  "XXX....",
  "XXX....",
  "XXXX...",
  "XX.XX..",
  "XX..XX.",
  "XX...XX",
];
const K_COLS = 7;
const K_ROWS = 10;

type Shape = "k" | "node";

interface ShapePoint {
  x: number;
  y: number;
}

interface Target {
  el: HTMLElement;
  shape: Shape;
  /* Lado de cada bloque como fracción de la celda base de la figura */
  cells: number;
}

interface Dot {
  gx: number;
  gy: number;
  depth: number;
  phase: number;
  size: number;
  target: number;
  sx: number;
  sy: number;
  delay: number;
  t: number;
}

interface Band {
  el: HTMLElement;
  ink: string;
  accent: string;
  top: number;
  bottom: number;
}

const shapePoints = (shape: Shape, sub: number): ShapePoint[] => {
  const points: ShapePoint[] = [];
  if (shape === "node") {
    for (let r = 0; r < sub; r++) {
      for (let c = 0; c < sub; c++) {
        points.push({ x: (c + 0.5) / sub, y: (r + 0.5) / sub });
      }
    }
    return points;
  }
  K_MASK.forEach((row, r) => {
    [...row].forEach((cell, c) => {
      if (cell !== "X") return;
      for (let j = 0; j < sub; j++) {
        for (let i = 0; i < sub; i++) {
          points.push({
            x: (c + (i + 0.5) / sub) / K_COLS,
            y: (r + (j + 0.5) / sub) / K_ROWS,
          });
        }
      }
    });
  });
  return points;
};

const cssColor = (el: Element, name: string) =>
  `rgb(${getComputedStyle(el).getPropertyValue(name).trim().split(/\s+/).join(",")})`;

const smooth = (v: number) => v * v * (3 - 2 * v);

export const DotField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dots: Dot[] = [];
    let targets: Target[] = [];
    let bands: Band[] = [];
    let frame = 0;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let lastTime = performance.now();
    const pointer = { x: -9999, y: -9999 };

    const build = () => {
      const compact = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio, compact ? 1.5 : 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const spacing = compact ? 44 : 52;
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            gx: (c + 0.2 + Math.random() * 0.6) / cols,
            gy: (r + 0.2 + Math.random() * 0.6) / rows,
            depth: 0.25 + Math.random() * 0.75,
            phase: Math.random() * Math.PI * 2,
            size: 2 + Math.random() * 2.5,
            target: -1,
            sx: 0,
            sy: 0,
            delay: Math.random(),
            t: 0,
          });
        }
      }

      targets = [...document.querySelectorAll<HTMLElement>("[data-dots]")].map((el) => {
        const shape: Shape = el.dataset.dots === "k" ? "k" : "node";
        const cells = shape === "k" ? (compact ? 1 : 2) : compact ? 3 : 4;
        return { el, shape, cells };
      });

      const free = dots.map((_, i) => i).sort(() => Math.random() - 0.5);
      targets.forEach((target, index) => {
        shapePoints(target.shape, target.cells).forEach((point) => {
          const id = free.pop();
          if (id === undefined) return;
          dots[id].target = index;
          dots[id].sx = point.x;
          dots[id].sy = point.y;
        });
      });

      bands = [...document.querySelectorAll<HTMLElement>("[data-field]")].map((el) => ({
        el,
        ink: cssColor(el, "--ink"),
        accent: cssColor(el, "--accent"),
        top: 0,
        bottom: 0,
      }));
    };

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const scroll = window.scrollY;
      const damp = reduced ? 1 : 1 - Math.exp(-dt * 9);
      velocity += ((scroll - lastScroll) / Math.max(dt, 0.001) / 60 - velocity) * damp;
      lastScroll = scroll;
      const time = reduced ? 0 : now / 1000;

      bands.forEach((band) => {
        const rect = band.el.getBoundingClientRect();
        band.top = rect.top;
        band.bottom = rect.bottom;
      });
      const visible = bands.filter((band) => band.bottom > 0 && band.top < height);

      const frames = targets.map((target) => {
        const rect = target.el.getBoundingClientRect();
        const onScreen = rect.bottom > -height && rect.top < height * 2;
        const manual = target.el.dataset.g;
        const gather =
          manual !== undefined
            ? Number(manual)
            : clamp01((height * 0.92 - rect.top) / (height * 0.45));
        const unit =
          target.shape === "k"
            ? Math.min(rect.width / K_COLS, rect.height / K_ROWS)
            : Math.min(rect.width, rect.height);
        const w = target.shape === "k" ? unit * K_COLS : unit;
        const h = target.shape === "k" ? unit * K_ROWS : unit;
        const cell = unit / target.cells;
        return {
          gather: onScreen ? gather : 0,
          x: rect.left + (rect.width - w) / 2,
          y: rect.top + (rect.height - h) / 2,
          w,
          h,
          block: Math.max(2, cell - Math.max(1.5, cell * 0.14)),
        };
      });

      ctx.clearRect(0, 0, width, height);
      const span = height + 60;
      const stretch = reduced ? 0 : Math.min(Math.abs(velocity), 40);

      for (const dot of dots) {
        let x = dot.gx * width;
        let y = dot.gy * span - (reduced ? 0 : scroll * dot.depth * 0.22);
        y = (((y % span) + span) % span) - 30;
        x += Math.sin(time * 0.5 + dot.phase) * 7 * dot.depth;
        let size = dot.size;
        let length = dot.size + stretch * dot.depth * 0.6;

        if (dot.target >= 0) {
          const shape = frames[dot.target];
          const goal = smooth(clamp01(shape.gather * 1.5 - dot.delay * 0.5));
          dot.t += (goal - dot.t) * damp;
          if (dot.t > 0.002) {
            const tx = shape.x + dot.sx * shape.w;
            const ty = shape.y + dot.sy * shape.h;
            x += (tx - x) * dot.t;
            y += (ty - y) * dot.t;
            size += (shape.block - size) * dot.t;
            length += (shape.block - length) * dot.t;
          }
        }

        const free = 1 - dot.t;
        if (free > 0.01) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0.01) {
            const push = (1 - dist / 140) * 34 * free;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }

        let band: Band | undefined;
        for (const candidate of visible) {
          if (y >= candidate.top && y < candidate.bottom) band = candidate;
        }
        if (!band) continue;

        const base = 0.22 + dot.depth * 0.2;
        ctx.globalAlpha = base + (1 - base) * dot.t;
        ctx.fillStyle = dot.t > 0.5 ? band.accent : band.ink;
        ctx.fillRect(x - size / 2, y - length / 2, size, length);
      }
      ctx.globalAlpha = 1;
    };

    const onPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    build();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[5] h-lvh w-full"
    />
  );
};

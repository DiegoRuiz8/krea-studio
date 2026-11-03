import { useEffect, useRef } from "react";
import * as THREE from "three";
import { PROCESS_STEPS, clamp01, processStep } from "../lib/motion";

/*
 * Un sitio dibujado como tres láminas apiladas (interfaz, marca, automatización)
 * en vista axonométrica. Según la sección, la pila se abre en vista explotada,
 * resalta una lámina o se arma paso a paso. Su lugar en pantalla sale de anclas
 * en el DOM: [data-anchor] (hero, services, process, cta). Detrás, un campo de
 * puntos se desplaza con el scroll y se aparta del cursor.
 */

const SHEET_W = 3.2;
const SHEET_D = 2.2;
const SHEET_T = 0.06;
const CLOSED_GAP = 0.14;
const OPEN_GAP = 1.25;
const TEX_W = 1024;
const TEX_H = Math.round((TEX_W * SHEET_D) / SHEET_W);
const ISO = new THREE.Euler(0.62, -Math.PI / 4, 0, "YXZ");

type AnchorName = "hero" | "services" | "process" | "cta";

interface SceneState {
  explode: number;
  fill: number;
  edges: number;
  lift: number;
  active: number;
}

const rgb = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);

const css = (name: string, alpha = 1) => `rgb(${rgb(name).join(" ")} / ${alpha})`;

const color = (name: string) => {
  const [r, g, b] = rgb(name);
  return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
};

const roundRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fill();
};

/* Cada lámina lleva un dibujo plano de lo que representa */
const drawSheet = (kind: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const ink = css("--ink");
  const soft = css("--ink", 0.16);
  const accent = css("--accent");
  ctx.fillStyle = css("--sheet");
  ctx.fillRect(0, 0, TEX_W, TEX_H);
  const m = 64;

  if (kind === 0) {
    // Interfaz: barra, titular, texto, botón e imagen
    ctx.fillStyle = ink;
    ctx.fillRect(m, m, 120, 22);
    [0, 1, 2].forEach((i) => ctx.fillRect(TEX_W - m - 360 + i * 90, m + 4, 64, 14));
    ctx.fillRect(TEX_W - m - 80, m - 4, 80, 30);
    ctx.fillRect(m, 190, 470, 54);
    ctx.fillRect(m, 262, 360, 54);
    ctx.fillStyle = soft;
    [0, 1, 2].forEach((i) => ctx.fillRect(m, 360 + i * 30, 420 - i * 60, 14));
    ctx.fillStyle = accent;
    ctx.fillRect(m, 480, 190, 64);
    ctx.fillStyle = soft;
    ctx.fillRect(600, 190, TEX_W - 600 - m, 354);
    ctx.strokeStyle = css("--ink", 0.35);
    ctx.lineWidth = 3;
    for (let x = 600 - 354; x < TEX_W - m; x += 26) {
      ctx.beginPath();
      ctx.moveTo(Math.max(600, x), 190 + Math.max(0, 600 - x));
      ctx.lineTo(Math.min(TEX_W - m, x + 354), 544 - Math.max(0, x + 354 - (TEX_W - m)));
      ctx.stroke();
    }
  } else if (kind === 1) {
    // Marca: monograma, muestras de color y tipografía
    ctx.fillStyle = ink;
    ctx.font = '400 400px "Instrument Serif", Georgia, serif';
    ctx.textBaseline = "alphabetic";
    ctx.fillText("K.", m - 10, 470);
    const swatches = [css("--ink"), css("--accent"), css("--surface-raised"), css("--ink-soft")];
    swatches.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(560 + (i % 2) * 190, 90 + Math.floor(i / 2) * 190, 170, 170);
    });
    ctx.fillStyle = ink;
    ctx.font = '600 120px "Instrument Sans", system-ui, sans-serif';
    ctx.fillText("Aa", 560, 600);
    ctx.fillStyle = soft;
    ctx.fillRect(740, 540, 220, 14);
    ctx.fillRect(740, 572, 160, 14);
  } else {
    // Automatización: conversación y flujo de nodos
    ctx.fillStyle = soft;
    roundRect(ctx, m, m, 380, 74, 30);
    roundRect(ctx, m, m + 180, 300, 74, 30);
    ctx.fillStyle = accent;
    roundRect(ctx, m + 200, m + 90, 380, 74, 30);
    roundRect(ctx, m + 160, m + 270, 420, 74, 30);
    ctx.fillStyle = ink;
    [0, 1, 2].forEach((i) => ctx.fillRect(m + 30 + i * 40, m + 32, 22, 10));
    const nodes = [
      [690, 140],
      [880, 300],
      [690, 460],
      [880, 560],
    ];
    ctx.strokeStyle = ink;
    ctx.lineWidth = 6;
    ctx.beginPath();
    nodes.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.stroke();
    nodes.forEach(([x, y], i) => {
      ctx.fillStyle = i === 1 ? accent : ink;
      ctx.beginPath();
      ctx.arc(x, y, 34, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = soft;
    ctx.fillRect(m, 520, 420, 14);
    ctx.fillRect(m, 552, 300, 14);
  }
  return canvas;
};

const Layers = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    let disposed = false;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -4000, 4000);
    camera.position.z = 1000;

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    // Pila de láminas
    const stack = new THREE.Group();
    const tilt = new THREE.Group();
    stack.add(tilt);
    scene.add(stack);

    const accent = color("--accent");
    const sheetColor = new THREE.Color(1, 1, 1);
    const geometry = track(new THREE.BoxGeometry(SHEET_W, SHEET_T, SHEET_D));
    const edgesGeometry = track(new THREE.EdgesGeometry(geometry));
    const side = track(new THREE.MeshBasicMaterial({ color: color("--surface-raised"), transparent: true }));
    const under = track(new THREE.MeshBasicMaterial({ color: color("--surface"), transparent: true }));

    const sheets = [0, 1, 2].map((kind) => {
      const texture = track(new THREE.CanvasTexture(drawSheet(kind)));
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      const top = track(new THREE.MeshBasicMaterial({ map: texture, transparent: true }));
      const mesh = new THREE.Mesh(geometry, [side, side, top, under, side, side]);
      const lineMaterial = track(new THREE.LineBasicMaterial({ color: color("--ink"), transparent: true }));
      mesh.add(new THREE.LineSegments(edgesGeometry, lineMaterial));
      tilt.add(mesh);
      return { mesh, top, texture, lineMaterial, kind };
    });

    // Las fuentes del dibujo de marca pueden llegar después
    document.fonts.ready.then(() => {
      if (disposed) return;
      sheets.forEach((s) => {
        s.texture.image = drawSheet(s.kind);
        s.texture.needsUpdate = true;
      });
    });

    // Guías verticales de la vista explotada, una por esquina
    const guidePositions = new Float32Array(4 * 2 * 3);
    const guideGeometry = track(new THREE.BufferGeometry());
    guideGeometry.setAttribute("position", new THREE.BufferAttribute(guidePositions, 3));
    const guideMaterial = track(
      new THREE.LineDashedMaterial({ color: color("--ink"), dashSize: 0.08, gapSize: 0.08, transparent: true }),
    );
    const guides = new THREE.LineSegments(guideGeometry, guideMaterial);
    tilt.add(guides);

    // Sombra plana, como de impresión
    const shadowMaterial = track(
      new THREE.MeshBasicMaterial({ color: color("--ink"), transparent: true, opacity: 0.08 }),
    );
    const shadow = new THREE.Mesh(track(new THREE.PlaneGeometry(SHEET_W, SHEET_D)), shadowMaterial);
    shadow.rotation.x = -Math.PI / 2;
    tilt.add(shadow);

    // Tamaño proyectado de la pila abierta, para encajarla en cada ancla
    const isoQuat = new THREE.Quaternion().setFromEuler(ISO);
    const projected = (() => {
      const box = new THREE.Box2();
      const corner = new THREE.Vector3();
      for (const y of [-(OPEN_GAP + SHEET_T), OPEN_GAP + SHEET_T, -(OPEN_GAP + 0.6)]) {
        for (const x of [-SHEET_W / 2, SHEET_W / 2]) {
          for (const z of [-SHEET_D / 2, SHEET_D / 2]) {
            corner.set(x, y, z).applyQuaternion(isoQuat);
            box.expandByPoint(new THREE.Vector2(corner.x, corner.y));
          }
        }
      }
      return box.getSize(new THREE.Vector2());
    })();

    // Campo de puntos
    const spacing = compact ? 30 : 26;
    let dotCols = 0;
    let dotRows = 0;
    let dotPositions = new Float32Array(0);
    const dotGeometry = track(new THREE.BufferGeometry());
    const dotMaterial = track(
      new THREE.PointsMaterial({
        color: color("--ink"),
        size: 2,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.28,
      }),
    );
    const dots = new THREE.Points(dotGeometry, dotMaterial);
    dots.position.z = -1000;
    dots.frustumCulled = false;
    scene.add(dots);

    let width = 0;
    let height = 0;
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === width && h === height) return;
      width = w;
      height = h;
      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      dotCols = Math.ceil(w / spacing) + 2;
      dotRows = Math.ceil(h / spacing) + 2;
      dotPositions = new Float32Array(dotCols * dotRows * 3);
      dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, nx: 0, ny: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ny = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-anchor]"));
    const processSection = document.querySelector<HTMLElement>('[data-scene="process"]');
    const heroSection = document.querySelector<HTMLElement>('[data-scene="hero"]');

    const state: SceneState = { explode: 0, fill: 1, edges: 1, lift: 0, active: -1 };
    const highlight = [0, 0, 0];
    const place = { x: 0, y: 0, s: 60 };
    let current: AnchorName = "hero";
    let switchedAt = -Infinity;
    let first = true;
    const start = performance.now();
    let last = start;
    let raf = 0;
    const tint = new THREE.Color();
    const yaw = new THREE.Quaternion();
    const corner = new THREE.Vector3();

    const targetFor = (name: AnchorName, el: HTMLElement): SceneState => {
      if (name === "hero") {
        const r = heroSection?.getBoundingClientRect();
        const leave = r ? clamp01(-r.top / (r.height * 0.7)) : 0;
        return { explode: 0.38 + leave * 0.62, fill: 1, edges: 1, lift: 0, active: -1 };
      }
      if (name === "services") {
        return { explode: 1, fill: 1, edges: 1, lift: 0, active: Number(el.dataset.active ?? -1) };
      }
      if (name === "process" && processSection) {
        const r = processSection.getBoundingClientRect();
        const p = -r.top / Math.max(1, r.height - window.innerHeight);
        const step = (i: number) => processStep(p, i);
        return {
          edges: 0.15 + step(0) * 0.85,
          fill: step(1),
          explode: 1 - step(2) * 0.9,
          lift: step(PROCESS_STEPS - 1),
          active: step(PROCESS_STEPS - 1) > 0.5 ? 0 : -1,
        };
      }
      return { explode: 0.12, fill: 1, edges: 1, lift: 0, active: 0 };
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = reduced ? 0 : (now - start) / 1000;
      const vh = window.innerHeight;

      // Ancla con más superficie visible
      let best: HTMLElement | null = null;
      let bestArea = 0;
      for (const el of anchors) {
        const r = el.getBoundingClientRect();
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
        const area = visible * r.width;
        if (area > bestArea) {
          bestArea = area;
          best = el;
        }
      }
      if (!best) {
        renderer.render(scene, camera);
        return;
      }
      const name = (best.dataset.anchor ?? "hero") as AnchorName;
      if (name !== current) {
        current = name;
        switchedAt = now;
      }

      const r = best.getBoundingClientRect();
      const s = Math.min(r.width / projected.x, r.height / projected.y);
      const target = targetFor(name, best);
      const handoff = reduced || first ? 1 : clamp01((now - switchedAt) / 900);
      const k = handoff < 1 ? 4 : 18;
      const damp = reduced || first ? 1 : 1 - Math.exp(-dt * k);
      first = false;

      place.x += (r.left + r.width / 2 - width / 2 - place.x) * damp;
      place.y += (height / 2 - (r.top + r.height / 2) - place.y) * damp;
      place.s += (s - place.s) * damp;

      const soft = reduced ? 1 : 1 - Math.exp(-dt * 6);
      state.explode += (target.explode - state.explode) * soft;
      state.fill += (target.fill - state.fill) * soft;
      state.edges += (target.edges - state.edges) * soft;
      state.lift += (target.lift - state.lift) * soft;
      state.active = target.active;

      pointer.sx += (pointer.x - pointer.sx) * (1 - Math.exp(-dt * 8));
      pointer.sy += (pointer.y - pointer.sy) * (1 - Math.exp(-dt * 8));

      // Pila
      stack.position.set(place.x, place.y + state.lift * place.s * 0.5, 0);
      stack.scale.setScalar(place.s);
      yaw.setFromAxisAngle(
        THREE.Object3D.DEFAULT_UP,
        pointer.nx * 0.18 + Math.sin(time * 0.35) * 0.04 + state.lift * time * 0.4,
      );
      tilt.quaternion.copy(yaw).multiply(isoQuat);
      tilt.quaternion.multiply(
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), pointer.ny * 0.06),
      );

      const gap = CLOSED_GAP + (OPEN_GAP - CLOSED_GAP) * state.explode;
      const intro = reduced ? 1 : clamp01((now - start) / 1400);
      sheets.forEach((sheet, i) => {
        // Al cargar, las láminas caen en su lugar una tras otra
        const drop = clamp01(intro * 1.6 - (2 - i) * 0.3);
        const eased = 1 - Math.pow(1 - drop, 3);
        sheet.mesh.position.y = (1 - i) * gap + (1 - eased) * 2.4;
        highlight[i] += ((state.active === i ? 1 : 0) - highlight[i]) * soft;
        tint.copy(sheetColor).lerp(accent, highlight[i] * 0.85);
        sheet.top.color.copy(tint);
        sheet.top.opacity = state.fill * eased;
        sheet.lineMaterial.opacity = state.edges * eased;
      });
      side.opacity = state.fill;
      under.opacity = state.fill;

      const topY = gap + SHEET_T / 2;
      const bottomY = -gap - SHEET_T / 2;
      [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].forEach(([sx, sz], i) => {
        corner.set((sx * SHEET_W) / 2, 0, (sz * SHEET_D) / 2);
        guidePositions.set([corner.x, bottomY, corner.z, corner.x, topY, corner.z], i * 6);
      });
      guideGeometry.attributes.position.needsUpdate = true;
      guides.computeLineDistances();
      guideMaterial.opacity = clamp01((state.explode - 0.3) / 0.7) * 0.55 * state.edges;
      shadow.position.y = -gap - 0.55 - state.lift * 0.6;
      shadowMaterial.opacity = 0.08 * state.fill * (1 - state.lift * 0.5);

      // Puntos: se desplazan con el scroll y se apartan del cursor
      const scrollShift = reduced ? 0 : (window.scrollY * 0.35) % spacing;
      const radius = compact ? 0 : 140;
      let n = 0;
      for (let row = 0; row < dotRows; row++) {
        for (let col = 0; col < dotCols; col++) {
          let x = col * spacing - spacing;
          let y = row * spacing - spacing - scrollShift;
          if (radius && !reduced) {
            const dx = x - pointer.sx;
            const dy = y - pointer.sy;
            const d = Math.hypot(dx, dy);
            if (d < radius && d > 0.001) {
              const push = (1 - d / radius) ** 2 * 26;
              x += (dx / d) * push;
              y += (dy / d) * push;
            }
          }
          dotPositions[n++] = x - width / 2;
          dotPositions[n++] = height / 2 - y;
          dotPositions[n++] = 0;
        }
      }
      dotGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-0 h-lvh"
    />
  );
};

export default Layers;

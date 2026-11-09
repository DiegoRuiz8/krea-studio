import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  PROCESS_NODES,
  clamp01,
  nodeProgress,
  processGather,
} from "../lib/motion";

/*
 * Un monolito de bloques con la K en relieve. El scroll lo desarma (hero),
 * lo deja flotando como fondo, lo reacomoda en nodos (Proceso) y lo vuelve
 * a armar junto al CTA. Las posiciones salen de anclas en el DOM:
 * [data-anchor="hero"], [data-anchor="cta"], [data-node] y [data-scene].
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
const COLS = 9;
const ROWS = 12;
const NODE_SIZE = 8;
const CABLE_SIZE = 72;
const FOV = 35;
const CAMERA_Z = 30;

type Role = "node" | "cable" | "free";

interface Block {
  home: THREE.Vector3;
  scatter: THREE.Vector3;
  axis: THREE.Vector3;
  spin: number;
  phase: number;
  delay: number;
  accent: boolean;
  role: Role;
  node: number;
  slot: THREE.Vector3;
  t: number;
}

interface Placement {
  center: THREE.Vector3;
  scale: number;
}

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const readColor = (name: string) => {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const [r, g, b] = raw.split(/\s+/).map(Number);
  return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
};

const buildBlocks = (layers: number): Block[] => {
  const rand = mulberry32(7);
  const blocks: Block[] = [];

  const add = (x: number, y: number, z: number, accent: boolean) => {
    const axis = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
    blocks.push({
      home: new THREE.Vector3(x, y, z),
      scatter: new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, -12 + rand() * 14),
      axis,
      spin: 0.15 + rand() * 0.35,
      phase: rand() * Math.PI * 2,
      delay: clamp01(((ROWS / 2 - y) / ROWS) * 0.55 + rand() * 0.45),
      accent,
      role: "free",
      node: -1,
      slot: new THREE.Vector3(),
      t: 0,
    });
  };

  K_MASK.forEach((line, r) => {
    [...line].forEach((cell, c) => {
      if (cell === "X") add(c - 3, 4.5 - r, 0.5, true);
    });
  });
  for (let layer = 0; layer < layers; layer++) {
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        add(col - (COLS - 1) / 2, (ROWS - 1) / 2 - row, -0.5 - layer, false);
      }
    }
  }

  const accents = blocks.filter((b) => b.accent);
  for (let i = 0; i < PROCESS_NODES * NODE_SIZE && i < accents.length; i++) {
    const block = accents[i];
    block.role = "node";
    block.node = Math.floor(i / NODE_SIZE);
    const s = i % NODE_SIZE;
    block.slot.set((s & 1) - 0.5, ((s >> 1) & 1) - 0.5, ((s >> 2) & 1) - 0.5);
  }
  const slab = blocks.filter((b) => !b.accent);
  const step = Math.max(1, Math.floor(slab.length / CABLE_SIZE));
  let cableIndex = 0;
  for (let i = 0; i < slab.length && cableIndex < CABLE_SIZE; i += step) {
    slab[i].role = "cable";
    slab[i].t = cableIndex / (CABLE_SIZE - 1);
    cableIndex++;
  }

  return blocks;
};

const Monolith = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.5 : 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const ground = readColor("--ground");
    renderer.setClearColor(ground, 1);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(ground, CAMERA_Z - 6, CAMERA_Z + 20);

    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
    camera.position.set(0, 0, CAMERA_Z);

    scene.add(new THREE.AmbientLight(readColor("--block-light"), 0.35));
    const key = new THREE.DirectionalLight(readColor("--block-light"), 2.2);
    key.position.set(-6, 9, 12);
    scene.add(key);
    const rim = new THREE.DirectionalLight(readColor("--accent"), 0.9);
    rim.position.set(8, -4, -6);
    scene.add(rim);
    const cursor = new THREE.PointLight(readColor("--block-light"), 90, 16, 2);
    scene.add(cursor);

    const blocks = buildBlocks(compact ? 1 : 2);
    const geometry = new THREE.BoxGeometry(0.94, 0.94, 0.94);
    const material = new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0.08 });
    const mesh = new THREE.InstancedMesh(geometry, material, blocks.length);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    const blockColor = readColor("--block");
    const accentColor = readColor("--accent");
    blocks.forEach((b, i) => mesh.setColorAt(i, b.accent ? accentColor : blockColor));
    scene.add(mesh);

    const elements = {
      hero: document.querySelector<HTMLElement>('[data-scene="hero"]'),
      heroAnchor: document.querySelector<HTMLElement>('[data-anchor="hero"]'),
      process: document.querySelector<HTMLElement>('[data-scene="process"]'),
      cta: document.querySelector<HTMLElement>('[data-scene="cta"]'),
      ctaAnchor: document.querySelector<HTMLElement>('[data-anchor="cta"]'),
      nodes: Array.from(document.querySelectorAll<HTMLElement>("[data-node]")),
    };

    let width = 0;
    let height = 0;
    let visW = 1;
    let visH = 1;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === width && Math.abs(h - height) < 1) return;
      width = w;
      height = h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      visH = 2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
      visW = visH * camera.aspect;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const toWorld = (x: number, y: number, out: THREE.Vector3) =>
      out.set((x / width - 0.5) * visW, (0.5 - y / height) * visH, 0);

    const placeIn = (el: HTMLElement | null, out: Placement) => {
      if (!el) return out;
      const r = el.getBoundingClientRect();
      toWorld(r.left + r.width / 2, r.top + r.height / 2, out.center);
      out.scale = Math.min(
        ((r.height / height) * visH) / ROWS,
        ((r.width / width) * visW) / COLS,
      );
      return out;
    };

    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const heroPlace: Placement = { center: new THREE.Vector3(), scale: 0.5 };
    const ctaPlace: Placement = { center: new THREE.Vector3(), scale: 0.5 };
    const nodePos = Array.from({ length: PROCESS_NODES }, () => new THREE.Vector3());
    const heroQuat = new THREE.Quaternion();
    const ctaQuat = new THREE.Quaternion();
    const euler = new THREE.Euler();
    const identity = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const target = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const targetQuat = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const matrix = new THREE.Matrix4();
    const tint = new THREE.Color();

    const state = { e: 0, g: 0, r: 0 };
    const start = performance.now();
    let last = start;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = reduced ? 0 : (now - start) / 1000;

      // Objetivos de cada fase a partir de las anclas en pantalla
      let eTarget = 0;
      if (elements.hero) {
        const r = elements.hero.getBoundingClientRect();
        eTarget = clamp01(-r.top / (r.height * 0.8));
      }
      let gTarget = 0;
      if (elements.process) {
        const r = elements.process.getBoundingClientRect();
        const pin = Math.max(1, r.height - window.innerHeight);
        gTarget = r.top < window.innerHeight ? processGather(-r.top / pin) : 0;
      }
      let rTarget = 0;
      if (elements.cta) {
        const r = elements.cta.getBoundingClientRect();
        rTarget = clamp01((window.innerHeight - r.top) / (window.innerHeight * 0.85));
      }

      if (reduced) {
        // Sin recorrido: el monolito se queda armado y solo se desvanece
        container.style.opacity = String(1 - eTarget);
        eTarget = 0;
        gTarget = 0;
        rTarget = 0;
      }

      const damp = 1 - Math.exp(-dt * 10);
      state.e += (eTarget - state.e) * damp;
      state.g += (gTarget - state.g) * damp;
      state.r += (rTarget - state.r) * damp;
      pointer.sx += (pointer.x - pointer.sx) * (1 - Math.exp(-dt * 4));
      pointer.sy += (pointer.y - pointer.sy) * (1 - Math.exp(-dt * 4));

      const intro = reduced ? 0 : 1 - clamp01((now - start) / 1900);
      const explode = Math.max(state.e, intro * intro * (3 - 2 * intro));

      if (explode < 1) placeIn(elements.heroAnchor, heroPlace);
      if (state.r > 0.001) placeIn(elements.ctaAnchor, ctaPlace);
      if (state.g > 0.001) {
        elements.nodes.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          toWorld(r.left + r.width / 2, r.top + r.height / 2, nodePos[i]);
        });
      }

      const settled = 1 - state.g;
      euler.set(
        -pointer.sy * 0.22 * settled + Math.sin(time * 0.5) * 0.03,
        -0.42 + pointer.sx * 0.5 * settled + Math.sin(time * 0.3) * 0.06,
        0,
      );
      heroQuat.setFromEuler(euler);
      euler.set(-pointer.sy * 0.15, 0.38 + pointer.sx * 0.35 + Math.sin(time * 0.3) * 0.05, 0);
      ctaQuat.setFromEuler(euler);

      toWorld(((pointer.sx + 1) / 2) * width, ((1 - pointer.sy) / 2) * height, cursor.position);
      cursor.position.z = 7;

      const fieldH = visH * 1.05;
      const drift = (window.scrollY / Math.max(1, height)) * visH;

      blocks.forEach((b, i) => {
        // Monolito del hero
        pos.copy(b.home).multiplyScalar(heroPlace.scale).applyQuaternion(heroQuat).add(heroPlace.center);
        quat.copy(heroQuat);
        let s = heroPlace.scale;

        // Campo flotante
        const depth = (b.scatter.z + 12) / 14;
        const sy = b.scatter.y * fieldH + drift * (0.18 + depth * 0.5) + Math.sin(time * 0.4 + b.phase) * 0.3;
        target.set(
          b.scatter.x * visW * 0.62 - pointer.sx * (0.4 + depth * 1.2),
          (((sy + fieldH) % (2 * fieldH)) + 2 * fieldH) % (2 * fieldH) - fieldH,
          b.scatter.z,
        );
        target.y -= pointer.sy * (0.3 + depth * 0.8);
        targetQuat.setFromAxisAngle(b.axis, b.phase + time * b.spin + state.e * 3);
        const ei = easeInOut(clamp01(explode * 1.7 - b.delay * 0.7));
        pos.lerp(target, ei);
        quat.slerp(targetQuat, ei);
        s += ((b.accent ? 0.42 : 0.34) - s) * ei;
        // Los bloques lima flotando detrás del texto se apagan un poco
        let dim = ei;

        // Nodos y cable del Proceso
        if (state.g > 0.001) {
          if (b.role === "node") {
            const gi = easeInOut(nodeProgress(state.g, b.node));
            const n = nodePos[b.node];
            target.copy(b.slot).multiplyScalar(0.5).applyAxisAngle(THREE.Object3D.DEFAULT_UP, time * 0.6).add(n);
            pos.lerp(target, gi);
            targetQuat.setFromAxisAngle(THREE.Object3D.DEFAULT_UP, time * 0.6);
            quat.slerp(targetQuat, gi);
            s += (0.46 - s) * gi;
            dim *= 1 - gi;
          } else if (b.role === "cable" && nodePos.length > 1) {
            const span = b.t * (nodePos.length - 1);
            const seg = Math.min(nodePos.length - 2, Math.floor(span));
            const gi = easeInOut(clamp01(state.g * 1.5 - b.t * 0.5));
            target.lerpVectors(nodePos[seg], nodePos[seg + 1], span - seg);
            const twist = b.t * Math.PI * 16 + time * 1.2;
            target.y += Math.sin(twist) * 0.14;
            target.z += Math.cos(twist) * 0.14;
            pos.lerp(target, gi);
            quat.slerp(identity, gi);
            s += (0.16 - s) * gi;
          } else {
            s *= 1 - 0.45 * state.g;
          }
        }

        // Monolito del CTA
        if (state.r > 0.001) {
          target.copy(b.home).multiplyScalar(ctaPlace.scale).applyQuaternion(ctaQuat).add(ctaPlace.center);
          const ri = easeInOut(clamp01(state.r * 1.7 - (1 - b.delay) * 0.7));
          pos.lerp(target, ri);
          quat.slerp(ctaQuat, ri);
          s += (ctaPlace.scale - s) * ri;
          dim *= 1 - ri;
        }

        if (b.accent) {
          tint.copy(accentColor).lerp(blockColor, dim * 0.5);
          mesh.setColorAt(i, tint);
        }
        scale.setScalar(s);
        matrix.compose(pos, quat, scale);
        mesh.setMatrixAt(i, matrix);
      });

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      material.dispose();
      mesh.dispose();
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

export default Monolith;

import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { nodeProgress, processGather } from "../lib/motion";
import { SplitWords } from "./Reveal";

const steps = [
  {
    title: "Estrategia",
    description: "Entendemos tu negocio y vemos dónde pierdes clientes: antes o después de que te escriben.",
  },
  {
    title: "Diseño",
    description: "Definimos el sitio, el flujo del chatbot o los dos. Alineado a tu marca.",
  },
  {
    title: "Desarrollo",
    description: "Construimos el sitio y conectamos las automatizaciones. Rápido, limpio y probado.",
  },
  {
    title: "Lanzamiento",
    description: "Publicamos, revisamos cada detalle y lo dejamos listo para vender y atender.",
  },
];

/*
 * Sección fijada: mientras dura, los bloques del monolito se juntan en un nodo
 * por paso ([data-node]) unidos por un cable. Cada paso se enciende cuando su
 * nodo termina de armarse.
 */
const Process = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const gather = processGather(p);
    setActive(steps.filter((_, i) => nodeProgress(gather, i) > 0.85).length);
  });

  return (
    <section id="proceso" ref={ref} data-scene="process" className="relative z-10 h-[260vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center px-gutter py-20">
        <div className="mb-10 flex flex-col gap-3 md:mb-20 md:flex-row md:items-end md:justify-between">
          <SplitWords
            text="El Proceso"
            className="text-[clamp(40px,5.4vw,96px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:font-wide"
          />
          <p className="text-lg text-ink-soft md:text-xl">Cómo trabajamos</p>
        </div>

        <ol className="grid gap-6 md:grid-cols-4 md:gap-8">
          {steps.map((step, index) => {
            const on = reduced || index < active;
            return (
              <li key={step.title} className="flex gap-5 md:flex-col md:gap-0">
                <span data-node aria-hidden="true" className="h-12 w-12 shrink-0 md:mb-10 md:h-28 md:w-28 md:self-center" />
                <div
                  className={`transition-[opacity,transform] duration-700 ease-out ${
                    on ? "opacity-100" : "translate-y-3 opacity-30"
                  }`}
                >
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink md:text-[32px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink md:mt-3 md:text-lg">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Process;

import { useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { processStep } from "../lib/motion";
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
 * Sección fijada: la pila de láminas se arma paso a paso. Estrategia la traza,
 * Diseño la rellena, Desarrollo la cierra y Lanzamiento la levanta.
 */
const Process = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [done, setDone] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setDone(steps.filter((_, i) => processStep(p, i) > 0.6).length);
  });

  return (
    <section id="proceso" ref={ref} data-scene="process" className="relative z-10 h-[300vh]">
      <div className="sticky top-0 grid h-[100svh] content-center gap-6 px-gutter py-16 md:grid-cols-axis md:gap-0">
        <div className="md:pr-10">
          <div data-anchor="process" aria-hidden="true" className="h-[26svh] md:h-[70svh]" />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-6">
            <SplitWords
              text="El Proceso"
              className="font-serif text-[clamp(42px,5vw,92px)] leading-[0.95] tracking-[-0.02em] text-ink"
            />
            <p className="text-base text-ink-soft md:text-lg">Cómo trabajamos</p>
          </div>

          <ol className="mt-6 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
            {steps.map((step, index) => {
              const on = reduced || index < done;
              return (
                <li
                  key={step.title}
                  className={`transition-[opacity,transform] duration-700 ease-out ${
                    on ? "opacity-100" : "translate-y-2 opacity-30"
                  }`}
                >
                  <h3 className="text-xl font-semibold tracking-[-0.01em] text-ink md:text-[28px]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink md:mt-2 md:text-lg">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT } from "../lib/motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      ref={ref}
      data-scene="hero"
      className="relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-gutter pb-8 pt-24 md:pb-12 md:pt-28"
    >
      <motion.p
        {...rise(0.2)}
        className="max-w-[18ch] text-[15px] font-medium leading-snug text-ink md:text-lg"
      >
        Sitios web + automatización con IA
        <span className="block text-ink-soft">Guadalajara, MX</span>
      </motion.p>

      {/* Hueco que ocupa el monolito 3D */}
      <div
        data-anchor="hero"
        aria-hidden="true"
        className="mx-auto my-4 h-full min-h-[34svh] w-full max-w-[560px] md:absolute md:right-gutter md:top-[9svh] md:my-0 md:h-[50svh] md:w-[42vw] md:max-w-none"
      />

      <motion.div style={{ y: textY }} className="self-end">
        <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-ink text-[clamp(44px,7.4vw,136px)] md:font-wide">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.35, ease: EASE_OUT }}
            >
              Sitios que convierten.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.47, ease: EASE_OUT }}
            >
              IA que atiende.
            </motion.span>
          </span>
        </h1>

        <div className="mt-6 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            {...rise(0.7)}
            className="max-w-[46ch] text-base leading-relaxed text-ink md:text-lg"
          >
            Hacemos el sitio que te trae clientes. Y el sistema que les
            contesta, les recuerda su cita y les da seguimiento. Sin
            plantillas, sin intermediarios, precio fijo.
          </motion.p>

          <motion.div {...rise(0.82)} className="flex flex-wrap gap-3">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 bg-accent px-5 py-4 text-[15px] font-semibold text-on-accent transition-transform duration-200 ease-out active:scale-[0.97] md:px-7"
            >
              Agendar Consulta
              <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center bg-surface-raised px-5 py-4 text-[15px] font-semibold text-ink transition-[transform,background-color,color] duration-200 ease-out hover:bg-ink hover:text-ground active:scale-[0.97] md:px-7"
            >
              Ver Portfolio
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

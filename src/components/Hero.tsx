import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

const lines = ["Sitios que convierten.", "IA que atiende."];

const Hero = () => (
  <section
    data-scene="hero"
    className="relative z-10 flex min-h-[100svh] flex-col px-gutter pb-10 pt-20 md:pb-14 md:pt-24"
  >
    {/* Banda de cabecera: aquí se dibuja la pila de láminas */}
    <div data-anchor="hero" aria-hidden="true" className="h-[34svh] w-full md:h-[46svh]" />

    <div className="mt-6 grid flex-1 content-end gap-8 md:mt-0 md:grid-cols-axis md:gap-0">
      <motion.p
        {...rise(0.6)}
        className="order-last self-end text-base leading-snug text-ink md:order-none md:pr-10 md:text-lg"
      >
        Sitios web + automatización con IA
        <span className="block text-ink-soft">Guadalajara, MX</span>
      </motion.p>

      <div>
        <h1 className="font-serif text-[clamp(46px,6.9vw,132px)] leading-[0.95] tracking-[-0.02em] text-ink">
          {lines.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: EASE_OUT }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          {...rise(0.55)}
          className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink md:mt-8 md:text-[22px] md:leading-snug"
        >
          Hacemos el sitio que te trae clientes. Y el sistema que les contesta,
          les recuerda su cita y les da seguimiento. Sin plantillas, sin
          intermediarios, precio fijo.
        </motion.p>

        <motion.div {...rise(0.7)} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-3 bg-accent px-6 py-4 text-base font-semibold text-on-accent transition-[transform,background-color,color] duration-200 ease-out hover:bg-ink hover:text-ground active:scale-[0.97]"
          >
            Agendar Consulta
            <span aria-hidden="true" className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </a>
          <a href="#portfolio" className="group relative py-2 text-base font-semibold text-ink">
            Ver Portfolio
            <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink transition-transform duration-300 ease-out group-hover:scale-x-0" />
          </a>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;

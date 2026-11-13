import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";
import { Phone } from "./Phone";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

const headline = ["Sitios que convierten.", "IA que atiende."];

interface HeroProps {
  inline: boolean;
  onEnter: () => void;
}

const Hero = ({ inline, onEnter }: HeroProps) => (
  <motion.section
    onViewportEnter={onEnter}
    viewport={{ margin: "-50% 0px -50% 0px" }}
    className="relative z-10 flex flex-col justify-between gap-10 pb-4 pt-24 md:min-h-[100svh] md:pb-14 md:pt-32"
  >
    <motion.p
      {...rise(0.2)}
      className="max-w-[18ch] text-[15px] font-medium leading-snug text-ink md:text-lg"
    >
      Sitios web + automatización con IA
      <span className="block text-ink-soft">Guadalajara, MX</span>
    </motion.p>

    <div>
      <h1 className="font-extrabold leading-[0.92] tracking-[-0.045em] text-ink text-[clamp(44px,5.7vw,112px)]">
        {headline.map((line, index) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.35 + index * 0.12, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        {...rise(0.7)}
        className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink md:mt-9 md:text-xl"
      >
        Hacemos el sitio que te trae clientes. Y el sistema que les
        contesta, les recuerda su cita y les da seguimiento. Sin
        plantillas, sin intermediarios, precio fijo.
      </motion.p>

      <motion.div {...rise(0.82)} className="mt-8 flex flex-wrap gap-3">
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

      {inline && (
        <motion.div {...rise(1)} className="mt-10">
          <Phone screen="intro" className="mx-auto w-[min(66vw,270px)]" />
        </motion.div>
      )}
    </div>
  </motion.section>
);

export default Hero;

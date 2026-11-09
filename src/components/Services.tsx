import { motion } from "framer-motion";
import { EASE_OUT } from "../lib/motion";
import { SplitWords } from "./Reveal";

const services = [
  {
    title: "Sitios web que convierten",
    description:
      "Diseño y código a medida. Rápido en celular, listo para Google y pensado para que te escriban.",
  },
  {
    title: "Tiendas en línea que venden",
    description:
      "Catálogo claro y compra sencilla, sobre todo desde el celular.",
  },
  {
    title: "Identidad visual y marca",
    description:
      "Logo, colores y tipografía consistentes en tu sitio, tus redes y tu WhatsApp.",
  },
  {
    title: "Chatbots para WhatsApp e Instagram",
    description:
      "Contestan las preguntas de siempre en segundos, a cualquier hora. Nadie se queda esperando.",
  },
  {
    title: "Recordatorios y seguimiento",
    description:
      "Recordatorios automáticos de citas y seguimiento a cada prospecto. Menos faltas, menos leads olvidados.",
  },
  {
    title: "Respuesta a reseñas",
    description:
      "Cada reseña recibe respuesta a tiempo y con el tono de tu marca.",
  },
];

const Services = () => (
  <section
    id="servicios"
    className="relative z-10 px-gutter pb-32 pt-32 md:pb-48 md:pt-56"
  >
    <div className="grid gap-12 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-5">
        <SplitWords
          text="Del primer clic a la cita confirmada"
          className="text-balance text-[clamp(40px,4.6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:sticky md:top-32 md:font-wide"
        />
      </div>

      <ul className="md:col-span-7">
        {services.map((service, index) => (
          <motion.li
            key={service.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 2) * 0.08 }}
            className="group relative isolate py-6 md:py-9"
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out group-hover:scale-x-100 md:-left-8 md:-right-8"
            />
            <h3 className="text-[clamp(26px,2.6vw,44px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink transition-transform duration-500 ease-out group-hover:translate-x-2">
              {service.title}
            </h3>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-ink md:text-lg">
              {service.description}
            </p>
          </motion.li>
        ))}
      </ul>
    </div>
  </section>
);

export default Services;

import { motion } from "framer-motion";
import { useState } from "react";
import { EASE_OUT } from "../lib/motion";
import { SplitWords } from "./Reveal";

/* `layer` es la lámina 3D que se resalta: 0 interfaz, 1 marca, 2 automatización */
const services = [
  {
    title: "Sitios web que convierten",
    description:
      "Diseño y código a medida. Rápido en celular, listo para Google y pensado para que te escriban.",
    layer: 0,
  },
  {
    title: "Tiendas en línea que venden",
    description:
      "Catálogo claro y compra sencilla, sobre todo desde el celular.",
    layer: 0,
  },
  {
    title: "Identidad visual y marca",
    description:
      "Logo, colores y tipografía consistentes en tu sitio, tus redes y tu WhatsApp.",
    layer: 1,
  },
  {
    title: "Chatbots para WhatsApp e Instagram",
    description:
      "Contestan las preguntas de siempre en segundos, a cualquier hora. Nadie se queda esperando.",
    layer: 2,
  },
  {
    title: "Recordatorios y seguimiento",
    description:
      "Recordatorios automáticos de citas y seguimiento a cada prospecto. Menos faltas, menos leads olvidados.",
    layer: 2,
  },
  {
    title: "Respuesta a reseñas",
    description:
      "Cada reseña recibe respuesta a tiempo y con el tono de tu marca.",
    layer: 2,
  },
];

const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="servicios" className="relative z-10 grid px-gutter pb-32 pt-24 md:grid-cols-axis md:pb-28 md:pt-40">
      <div className="md:pr-10">
        <div
          data-anchor="services"
          data-active={active}
          aria-hidden="true"
          className="h-[36svh] md:sticky md:top-[12svh] md:h-[76svh]"
        />
      </div>

      <div>
        <SplitWords
          text="Del primer clic a la cita confirmada"
          className="max-w-[16ch] font-serif text-[clamp(42px,5vw,92px)] leading-[0.95] tracking-[-0.02em] text-ink"
        />

        <ul className="mt-12 md:mt-20">
          {services.map((service, index) => (
            <motion.li
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              onMouseEnter={() => setActive(service.layer)}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: (index % 2) * 0.06 }}
              className="group relative isolate py-6 md:py-9"
            >
              {/* Franja central de la pantalla: la fila que pasa por ahí resalta su lámina */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 -z-20"
                onViewportEnter={() => setActive(service.layer)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
              />
              <span
                aria-hidden="true"
                className="absolute inset-y-0 -left-4 -right-4 -z-10 origin-left scale-x-0 bg-surface transition-transform duration-500 ease-out group-hover:scale-x-100 md:-left-8 md:-right-8"
              />
              <h3 className="text-[clamp(24px,2.3vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink transition-transform duration-500 ease-out group-hover:translate-x-2">
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
};

export default Services;

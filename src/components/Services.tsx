import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FieldEdge } from "./FieldEdge";
import { Phone, type ScreenId } from "./Phone";
import { SplitWords } from "./Reveal";

interface Service {
  title: string;
  description: string;
  screen: ScreenId;
}

const siteServices: Service[] = [
  {
    title: "Sitios web que convierten",
    description:
      "Diseño y código a medida. Rápido en celular, listo para Google y pensado para que te escriban.",
    screen: "sitio",
  },
  {
    title: "Tiendas en línea que venden",
    description:
      "Catálogo claro y compra sencilla, sobre todo desde el celular.",
    screen: "tienda",
  },
];

const automationServices: Service[] = [
  {
    title: "Chatbots para WhatsApp e Instagram",
    description:
      "Contestan las preguntas de siempre en segundos, a cualquier hora. Nadie se queda esperando.",
    screen: "chatbot",
  },
  {
    title: "Recordatorios y seguimiento",
    description:
      "Recordatorios automáticos de citas y seguimiento a cada prospecto. Menos faltas, menos leads olvidados.",
    screen: "recordatorio",
  },
  {
    title: "Respuesta a reseñas",
    description:
      "Cada reseña recibe respuesta a tiempo y con el tono de tu marca.",
    screen: "resena",
  },
];

/* En celular cada servicio lleva su propia pantalla, que arranca al entrar en vista */
const InlinePhone = ({ screen }: { screen: ScreenId }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });

  return (
    <div ref={ref} className="mt-7">
      <Phone screen={inView ? screen : null} className="mx-auto w-[min(66vw,270px)]" />
    </div>
  );
};

interface StepProps {
  service: Service;
  active: boolean;
  inline: boolean;
  onEnter: () => void;
}

const Step = ({ service, active, inline, onEnter }: StepProps) => (
  <motion.li
    onViewportEnter={onEnter}
    viewport={{ margin: "-50% 0px -50% 0px" }}
    className={`flex flex-col justify-center py-7 transition-opacity duration-500 ease-out md:min-h-[72svh] md:py-0 ${
      active ? "" : "md:opacity-30"
    }`}
  >
    <h3 className="max-w-[16ch] text-[clamp(30px,3.6vw,60px)] font-extrabold leading-[1] tracking-[-0.035em] text-ink">
      {service.title}
    </h3>
    <p className="mt-4 max-w-[42ch] text-lg leading-relaxed text-ink md:mt-6 md:text-xl">
      {service.description}
    </p>
    {inline && <InlinePhone screen={service.screen} />}
  </motion.li>
);

interface ServicesProps {
  active: ScreenId;
  inline: boolean;
  onScreen: (screen: ScreenId) => void;
}

const Services = ({ active, inline, onScreen }: ServicesProps) => {
  const renderSteps = (items: Service[]) =>
    items.map((service) => (
      <Step
        key={service.title}
        service={service}
        active={active === service.screen}
        inline={inline}
        onEnter={() => onScreen(service.screen)}
      />
    ));

  return (
    <section id="servicios" className="relative">
      <div className="relative z-10 pb-[15vh] pt-16 md:pb-[30vh] md:pt-40">
        <SplitWords
          text="Del primer clic a la cita confirmada"
          className="max-w-[14ch] text-[clamp(40px,4.6vw,80px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:font-wide"
        />
        <ul className="mt-4 md:mt-0">{renderSteps(siteServices)}</ul>
      </div>

      {/* El recorrido cambia de campo cuando el sitio le pasa el cliente a la IA */}
      <div data-field className="field-accent relative">
        <div className="absolute inset-y-0 -left-gutter w-screen bg-ground">
          <FieldEdge />
        </div>
        <ul className="relative z-10 py-6 md:py-0">{renderSteps(automationServices)}</ul>
      </div>
    </section>
  );
};

export default Services;

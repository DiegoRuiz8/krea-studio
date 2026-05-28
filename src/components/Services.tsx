import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Diseño orientado a conversión",
    description:
      "Diseñamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario.",
  },
  {
    number: "02",
    title: "Desarrollo web a medida",
    description:
      "Construimos aplicaciones web y móviles robustas con tecnologías modernas.",
  },
  {
    number: "03",
    title: "Tiendas en línea que venden",
    description:
      "Creamos tiendas online optimizadas para maximizar tus conversiones y ventas.",
  },
  {
    number: "04",
    title: "Identidad visual y marca",
    description:
      "Desarrollamos identidades visuales únicas que representan la esencia de tu marca.",
  },
  {
    number: "05",
    title: "Posicionamiento SEO y velocidad",
    description:
      "Optimizamos tu sitio para posicionamiento en buscadores y velocidad de carga.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative overflow-hidden pt-20 pb-10 md:pt-28 md:pb-14 px-margin-mobile md:px-margin-desktop bg-[#0A0A0A]"
    >
      {/* Glow verde sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-[-180px] h-[340px] w-[340px] rounded-full opacity-30"
        style={{
          background:
            "radial-gradient(closest-side, rgba(191,255,11,0.12), transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Malla visible de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
      linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
    `,
          backgroundSize: "76px 76px",
          backgroundPosition: "center center",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      />

      {/* Fade para que no corte con las secciones */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14 md:mb-16"
        >
          <motion.span
            variants={fadeUpVariants}
            className="font-body text-label-caps text-accent uppercase tracking-widest mb-5 block"
          >
            • Servicios
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-[clamp(38px,5vw,64px)] text-text-primary font-medium leading-tight tracking-[-0.03em]"
          >
            Soluciones para tu Negocio
          </motion.h2>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              variants={fadeUpVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer py-5 md:py-10 transition-colors duration-300"
            >
              {/* Hover background */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute inset-x-[-24px] inset-y-1 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.015] to-transparent"
              />

              {/* Línea verde hover */}
              <motion.div
                initial={false}
                animate={{
                  scaleX: hoveredIndex === index ? 1 : 0,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-accent via-accent/40 to-transparent"
              />

              <div className="relative z-10 flex flex-col gap-5 md:grid md:grid-cols-[80px_1fr_420px] md:items-center md:gap-10">
                <motion.span
                  animate={{
                    color: hoveredIndex === index ? "#BFFF0B" : "#6B6B6B",
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-lg md:text-xl font-medium"
                >
                  {service.number}.
                </motion.span>

                <motion.h3
                  animate={{
                    x: hoveredIndex === index ? 8 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-[clamp(32px,4vw,54px)] text-text-primary font-normal leading-[1.05] tracking-[-0.025em]"
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.72,
                    x: hoveredIndex === index ? 0 : 8,
                  }}
                  transition={{ duration: 0.35 }}
                  className="hidden md:block font-body text-body-md text-white/60 max-w-md leading-relaxed font-medium"
                >
                  {service.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;

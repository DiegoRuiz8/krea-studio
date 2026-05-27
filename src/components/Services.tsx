import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const services = [
  {
    number: '01',
    title: 'UI/UX Design',
    description:
      'Diseñamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario.',
  },
  {
    number: '02',
    title: 'Desarrollo Web & Mobile',
    description:
      'Construimos aplicaciones web y móviles robustas con tecnologías modernas.',
  },
  {
    number: '03',
    title: 'E-commerce Solutions',
    description:
      'Creamos tiendas online optimizadas para maximizar tus conversiones y ventas.',
  },
  {
    number: '04',
    title: 'Branding & Identity',
    description:
      'Desarrollamos identidades visuales únicas que representan la esencia de tu marca.',
  },
  {
    number: '05',
    title: 'SEO & Performance',
    description:
      'Optimizamos tu sitio para posicionamiento en buscadores y velocidad de carga.',
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
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="servicios"
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-[#0A0A0A]"
    >
      {/* Blur plateado / gunmetal */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, rgba(166,169,173,0.16), rgba(58,61,64,0.08), transparent 72%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Glow verde sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-[-160px] h-[360px] w-[360px] rounded-full opacity-50"
        style={{
          background:
            'radial-gradient(closest-side, rgba(191,255,11,0.12), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Malla visible de fondo */}
<div
  aria-hidden
  className="pointer-events-none absolute inset-0 opacity-100"
  style={{
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px),
      radial-gradient(ellipse at center, rgba(166,169,173,0.13), transparent 62%)
    `,
    backgroundSize: '76px 76px, 76px 76px, 100% 100%',
    backgroundPosition: 'center center',
    WebkitMaskImage:
      'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.85) 48%, transparent 88%)',
    maskImage:
      'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.85) 48%, transparent 88%)',
  }}
/>

      {/* Fade para que no corte con las secciones */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              variants={fadeUpVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
className="group relative cursor-pointer py-9 md:py-10 transition-colors duration-300"            >
              {/* Hover background */}
              <motion.div
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
className="absolute inset-x-[-24px] inset-y-1 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.015] to-transparent"              />

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
                    color: hoveredIndex === index ? '#BFFF0B' : '#6B6B6B',
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
                    opacity: hoveredIndex === index ? 1 : 0.58,
                    x: hoveredIndex === index ? 0 : 8,
                  }}
                  transition={{ duration: 0.35 }}
                  className="font-body text-body-md text-text-secondary max-w-md leading-relaxed"
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
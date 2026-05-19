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
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.75,
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
      className="py-section-gap px-margin-mobile md:px-margin-desktop"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-24"
        >
          <motion.span
            variants={fadeUpVariants}
            className="font-body text-label-caps text-accent uppercase tracking-widest mb-6 block"
          >
            • Servicios
          </motion.span>

          <motion.h2
            variants={fadeUpVariants}
            className="font-display text-5xl md:text-6xl text-text-primary font-medium"
          >
            Soluciones para tu Negocio
          </motion.h2>
        </motion.div>

        {/* Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-0"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              variants={fadeUpVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer border-t border-border-subtle/50 py-12 first:border-t-0 transition-colors duration-300 hover:border-accent/20"
            >
              <div className="flex items-center justify-between gap-12">
                <motion.span
                  animate={{
                    color: hoveredIndex === index ? '#BFFF0B' : '#6B6B6B',
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xl font-medium w-16 flex-shrink-0"
                >
                  {service.number}.
                </motion.span>

                <motion.h3
                  animate={{
                    x: hoveredIndex === index ? 12 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="font-display text-4xl md:text-5xl text-text-primary font-normal flex-1"
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.55,
                    x: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.35 }}
                  className="hidden lg:block font-body text-body-md text-text-secondary max-w-md flex-shrink-0"
                >
                  {service.description}
                </motion.p>
              </div>

              <motion.p
                initial={false}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  height: hoveredIndex === index ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="lg:hidden font-body text-body-md text-text-secondary mt-4 ml-16 overflow-hidden"
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
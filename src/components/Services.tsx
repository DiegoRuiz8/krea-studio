import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      number: '01',
      title: 'UI/UX Design',
      description: 'Diseñamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario.',
    },
    {
      number: '02',
      title: 'Desarrollo Web & Mobile',
      description: 'Construimos aplicaciones web y móviles robustas con tecnologías modernas.',
    },
    {
      number: '03',
      title: 'E-commerce Solutions',
      description: 'Creamos tiendas online optimizadas para maximizar tus conversiones y ventas.',
    },
    {
      number: '04',
      title: 'Branding & Identity',
      description: 'Desarrollamos identidades visuales únicas que representan la esencia de tu marca.',
    },
    {
      number: '05',
      title: 'SEO & Performance',
      description: 'Optimizamos tu sitio para posicionamiento en buscadores y velocidad de carga.',
    },
  ];

  return (
    <section 
      id="servicios"
      ref={ref}
      className="py-section-gap px-margin-mobile md:px-margin-desktop"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ 
              duration: 0.6,
              delay: 0.2
            }}
            className="font-body text-label-caps text-accent uppercase tracking-widest mb-6 block"
          >
            • Servicios
          </motion.span>
          <h2 className="font-display text-5xl md:text-6xl text-text-primary font-medium">
            Soluciones para tu Negocio
          </h2>
        </motion.div>

        {/* Lista minimalista de servicios */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer border-t border-border-subtle/50 py-12 first:border-t-0 transition-colors duration-300 hover:border-accent/20"
            >
              <div className="flex items-center justify-between gap-12">
                
                {/* Número */}
                <motion.span
                  animate={{
                    color: hoveredIndex === index ? '#BFFF0B' : '#6B6B6B'
                  }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xl font-medium text-text-secondary/50 w-16 flex-shrink-0"
                >
                  {service.number}.
                </motion.span>

                {/* Título */}
                <motion.h3
                  animate={{
                    x: hoveredIndex === index ? 10 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl md:text-5xl text-text-primary font-normal flex-1"
                >
                  {service.title}
                </motion.h3>

                {/* Descripción (solo visible en desktop) */}
                <motion.p
                  initial={{ opacity: 0.6 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.6
                  }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block font-body text-body-md text-text-secondary max-w-md flex-shrink-0"
                >
                  {service.description}
                </motion.p>
              </div>

              {/* Descripción mobile (debajo del título) */}
              <motion.p
                initial={{ opacity: 0.6, height: 0 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0.6,
                  height: hoveredIndex === index ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="lg:hidden font-body text-body-md text-text-secondary mt-4 ml-16 overflow-hidden"
              >
                {service.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
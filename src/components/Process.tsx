import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      title: 'Estrategia',
      description: 'Entendemos tu negocio, objetivos y audiencia para definir una estrategia clara.'
    },
    {
      number: '02',
      title: 'Diseño',
      description: 'Creamos prototipos visuales que reflejan tu identidad y maximizan la experiencia del usuario.'
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Construimos tu sitio con código limpio, optimizado y escalable usando tecnologías modernas.'
    },
    {
      number: '04',
      title: 'Lanzamiento',
      description: 'Deploy optimizado, pruebas exhaustivas y monitoreo continuo para garantizar el éxito.'
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container/30"
    >
      <div className="max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-body text-label-caps text-accent uppercase tracking-widest mb-4 block">
            Cómo trabajamos
          </span>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-text-primary">
            El Proceso
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: 'easeOut'
              }}
              className="relative"
            >
              {/* Línea conectora (solo desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border-subtle -z-10">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: (index * 0.15) + 0.3,
                      ease: 'easeInOut'
                    }}
                    className="h-full bg-accent/30 origin-left"
                  />
                </div>
              )}

              {/* Número grande */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 200
                }}
                className="font-display text-[80px] leading-none text-accent/20 mb-4 font-bold"
              >
                {step.number}
              </motion.div>

              {/* Contenido */}
              <h3 className="font-display text-headline-sm text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="font-body text-body-md text-text-secondary leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
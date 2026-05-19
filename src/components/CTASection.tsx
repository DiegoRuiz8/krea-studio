import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section 
      id="contacto"
      ref={ref}
      className="py-section-gap px-margin-mobile md:px-margin-desktop"
    >
      <div className="max-w-container-max mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl mx-auto bg-surface-container-high border border-border-subtle rounded-xl p-8 md:p-12 relative overflow-hidden text-center"
        >
          {/* Background glow pulsante */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] max-h-[600px] bg-accent rounded-full blur-[100px] pointer-events-none"
          />

          {/* Contenido */}
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-headline-lg-mobile md:text-headline-lg text-text-primary mb-6"
            >
              ¿Listo para llevar tu web al siguiente nivel?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-body text-body-lg text-text-secondary mb-10 max-w-2xl mx-auto"
            >
              Agenda una consultoría gratuita y descubramos cómo podemos 
              impulsar tu negocio con una experiencia digital superior.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 40px rgba(191, 255, 11, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-accent-hover text-[#0A0A0A] px-10 py-5 rounded font-body font-semibold text-base uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-3"
            >
              Hablemos de tu proyecto
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-accent/20 rounded-tl-xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-accent/20 rounded-br-xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
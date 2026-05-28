import { motion, useInView } from 'framer-motion';
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
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-10 md:px-16 md:py-16"
        >
          {/* Glow de fondo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent opacity-[0.07] blur-[80px]" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-accent/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-accent/20 rounded-br-2xl" />

          {/* Contenido */}
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-label-caps text-accent uppercase tracking-widest mb-5 block"
            >
              Hablemos
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="font-display text-headline-lg-mobile md:text-headline-lg text-text-primary mb-4 tracking-tight"
            >
              Tu sitio actual<br className="hidden md:block" /> está perdiendo clientes.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-body text-body-md text-[#B8B8B8] mb-8 leading-relaxed"
            >
              Llamada de 20 min. Sin costo. Te decimos exactamente qué está fallando y cómo lo arreglamos.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-accent text-[#0A0A0A] px-8 py-4 rounded-full font-body font-semibold text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-colors duration-200 hover:bg-[#D4FF3E]"
            >
              Agendar llamada gratuita
              <span className="text-base">→</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
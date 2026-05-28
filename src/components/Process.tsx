import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      number: '01',
      title: 'Estrategia',
      description: 'Entendemos tu negocio, tu cliente y el objetivo de la página.',
    },
    {
      number: '02',
      title: 'Diseño',
      description: 'Creamos una propuesta visual alineada a tu marca y enfocada en conversión.',
    },
    {
      number: '03',
      title: 'Desarrollo',
      description: 'Construimos tu sitio rápido, limpio y adaptable a cualquier dispositivo.',
    },
    {
      number: '04',
      title: 'Lanzamiento',
      description: 'Publicamos tu web, revisamos detalles y la dejamos lista para vender.',
    },
  ];

  return (
    <section
      id="proceso"
      ref={ref}
      className="relative overflow-hidden bg-[#0A0A0A] px-margin-mobile md:px-margin-desktop pt-12 md:pt-28 pb-10 md:pb-24"
    >
      {/* Malla de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
          `,
          backgroundSize: '76px 76px',
          backgroundPosition: 'center center',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-container-max mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16 max-w-3xl"
        >
          <span className="font-body text-label-caps text-accent uppercase tracking-widest mb-4 block">
            Cómo trabajamos
          </span>
          <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-text-primary">
            El Proceso
          </h2>
        </motion.div>

        {/* MOBILE: Lista de filas compactas */}
        <div className="md:hidden border-t border-white/10">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-start gap-4 py-4 border-b border-white/10"
            >
              <span className="font-body text-xs font-semibold text-accent/80 tracking-widest shrink-0 pt-0.5 w-6">
                {step.number}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base text-text-primary font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[#B8B8B8] leading-relaxed mt-0.5">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP: Cards en grid (sin cambios) */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative min-h-[230px] rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
            >
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-accent/45 via-white/10 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex h-full flex-col justify-between">
                <div>
                  <span className="font-body text-sm font-semibold text-accent/80 tracking-widest">
                    {step.number}
                  </span>
                  <h3 className="font-display text-[28px] text-text-primary font-semibold mt-8 mb-3 tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-md text-[#B8B8B8] leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-8 h-px w-10 bg-accent/35 transition-all duration-300 group-hover:w-16 group-hover:bg-accent/70" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
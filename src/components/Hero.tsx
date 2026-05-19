import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-margin-mobile md:px-margin-desktop pt-20 overflow-hidden">
      {/* Grid sutil SOLO en el Hero - con fade vertical */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
        }}
      />

      {/* Figuras geométricas flotantes de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Círculo grande arriba derecha */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full border-2 border-accent/20"
          style={{
            animation: 'float-slow 20s ease-in-out infinite',
            boxShadow: '0 0 60px rgba(191, 255, 11, 0.2)',
          }}
        />

        {/* Cuadrado mediano izquierda */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.4, rotate: 45 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="absolute top-1/3 left-20 w-32 h-32 border-2 border-accent/30"
          style={{
            animation: 'float-medium 15s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(191, 255, 11, 0.15)',
          }}
        />

        {/* Círculo pequeño centro-derecha */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-accent/10"
          style={{
            animation: 'float-fast 12s ease-in-out infinite, pulse-glow-shape 4s ease-in-out infinite',
          }}
        />

        {/* Rectángulo horizontal abajo */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 0.3, x: 0 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="absolute bottom-32 left-1/3 w-48 h-2 bg-accent/20"
          style={{
            animation: 'float-slow 18s ease-in-out infinite',
            boxShadow: '0 0 30px rgba(191, 255, 11, 0.3)',
          }}
        />

        {/* Círculo mediano abajo izquierda */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.3, delay: 1.1 }}
          className="absolute bottom-20 left-10 w-40 h-40 rounded-full border border-accent/25"
          style={{
            animation: 'float-medium 16s ease-in-out infinite reverse',
          }}
        />

        {/* Triángulo (simulado con rotate) arriba izquierda */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.35, rotate: 30 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="absolute top-40 left-1/4 w-24 h-24 border-2 border-accent/20"
          style={{
            animation: 'float-fast 14s ease-in-out infinite',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
      </div>

      {/* Contenido principal */}
<div className="max-w-container-max mx-auto w-full relative z-10">
  <div className="max-w-4xl">
    {/* Label superior */}
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="font-body text-label-caps text-accent uppercase tracking-widest mb-6 block"
    >
      Agencia de Desarrollo Web
    </motion.span>

    {/* Headline principal */}
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="font-display text-display-xl-mobile md:text-display-xl text-text-primary mb-8 leading-tight"
    >
      Creamos experiencias web que{' '}
      <span className="text-accent">convierten</span>
    </motion.h1>

    {/* Descripción */}
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="font-body text-body-lg text-text-secondary max-w-2xl mb-12"
    >
      Diseñamos y desarrollamos sitios web personalizados que 
      transforman ideas en soluciones digitales elegantes y de alto 
      rendimiento.
    </motion.p>

    {/* CTAs */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="flex flex-col sm:flex-row gap-4"
    >
      <motion.button
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 30px rgba(191, 255, 11, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        className="bg-accent hover:bg-accent-hover text-[#0A0A0A] px-8 py-4 rounded font-body font-semibold text-base uppercase tracking-wider transition-all duration-300"
      >
        Agendar Consulta
      </motion.button>

      <motion.button
        whileHover={{ 
          scale: 1.05,
          borderColor: '#BFFF0B'
        }}
        whileTap={{ scale: 0.95 }}
        className="border border-border-subtle hover:border-accent text-text-primary px-8 py-4 rounded font-body font-semibold text-base uppercase tracking-wider transition-all duration-300"
      >
        Ver Portfolio
      </motion.button>
    </motion.div>
  </div>
</div>

{/* Scroll indicator */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1, delay: 1.2 }}
  className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
>
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
    className="w-6 h-10 border-2 border-accent rounded-full flex justify-center pt-2"
  >
    <motion.div
      animate={{ y: [0, 12, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className="w-1.5 h-1.5 bg-accent rounded-full"
    />
  </motion.div>
</motion.div>
      
    </section>
  );
};

export default Hero;
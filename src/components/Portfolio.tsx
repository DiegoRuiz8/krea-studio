import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const categories = [
    'All',
    'Landing Page',
    'E-commerce',
    'SaaS',
    'Mobile Design',
  ];

  const projects = [
    {
      title: 'E-commerce Moda',
      subtitle: 'Modern Fashion E-commerce Platform',
      category: 'E-commerce',
      description: 'Plataforma completa de e-commerce con integración de Shopify, sistema de pagos y gestión de inventario en tiempo real.',
      tags: ['React', 'Shopify', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop',
    },
    {
      title: 'SaaS Dashboard',
      subtitle: 'Analytics & Data Visualization',
      category: 'SaaS',
      description: 'Dashboard de analytics con visualización de datos en tiempo real, reportes personalizables y sistema de notificaciones.',
      tags: ['Next.js', 'TypeScript', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop',
    },
    {
      title: 'Landing Fintech',
      subtitle: 'Financial Services Landing Page',
      category: 'Landing Page',
      description: 'Landing page para servicios financieros con animaciones elegantes, formularios de captura y calculadora de préstamos.',
      tags: ['React', 'Framer Motion', 'Tailwind'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2400&auto=format&fit=crop',
    },
    {
      title: 'Mobile Banking App',
      subtitle: 'iOS & Android Banking Solution',
      category: 'Mobile Design',
      description: 'Aplicación móvil de banca con transferencias instantáneas, gestión de tarjetas y sistema de seguridad biométrica.',
      tags: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2400&auto=format&fit=crop',
      span: 'md:col-span-1'
    },
    {
      title: 'Portfolio Agency',
      subtitle: 'Creative Agency Website',
      category: 'Landing Page',
      description: 'Sitio web para agencia creativa con galería de proyectos, sistema de filtros y formulario de contacto integrado.',
      tags: ['Vue.js', 'GSAP', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=2400&auto=format&fit=crop',
      span: 'md:col-span-1'
    },
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section 
        id="portfolio"
        ref={ref}
        className="py-section-gap px-margin-mobile md:px-margin-desktop"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-16"
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
              • Portfolio
            </motion.span>
            <h2 className="font-display text-5xl md:text-6xl text-text-primary font-medium mb-6">
              Proyectos Destacados
            </h2>
            <p className="font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
              Una selección de nuestros trabajos más recientes
            </p>
          </motion.div>

          {/* Filtros de categoría */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6,
              delay: 0.4
            }}
            className="mb-16"
          >
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.4,
                    delay: 0.5 + (index * 0.05)
                  }}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-3 rounded-full font-body text-body-md whitespace-nowrap
                    transition-all duration-300 flex-shrink-0
                    ${selectedCategory === category 
                      ? 'bg-accent text-[#0A0A0A] font-medium' 
                      : 'bg-surface-container-high text-text-secondary hover:bg-surface-container-highest hover:text-text-primary'
                    }
                  `}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Grid de proyectos - Layout: 2 grandes arriba, 3 medianos abajo */}
          <motion.div 
            layout
            className="space-y-6"
          >
            {/* Fila superior - 2 proyectos grandes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.slice(0, 2).map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(index)}
                  className="group relative rounded-2xl overflow-hidden bg-surface-container-high cursor-pointer"
                >
                  {/* Contenedor de imagen con aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Imagen con zoom en hover */}
                    <motion.div
                      animate={{
                        scale: hoveredIndex === index ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Overlay gradient */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === index ? 0.8 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"
                    />

                    {/* Contenido hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        y: hoveredIndex === index ? 0 : 20
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-end p-8"
                    >
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <h3 className="font-display text-2xl text-text-primary mb-2">
                            {project.title}
                          </h3>
                          <p className="font-body text-body-sm text-text-secondary">
                            {project.subtitle}
                          </p>
                        </div>
                        
                        {/* Botón de flecha */}
                        <motion.div
                          animate={{
                            scale: hoveredIndex === index ? 1 : 0.8,
                            backgroundColor: hoveredIndex === index ? '#BFFF0B' : 'rgba(62, 62, 62, 0.8)',
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <ArrowUpRight 
                            className={`w-5 h-5 transition-colors duration-300 ${
                              hoveredIndex === index ? 'text-[#0A0A0A]' : 'text-text-secondary'
                            }`}
                            strokeWidth={2}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Border glow en hover */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fila inferior - 3 proyectos medianos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.slice(2, 5).map((project, index) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.5,
                    delay: (index + 2) * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  onMouseEnter={() => setHoveredIndex(index + 2)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedProject(index + 2)}
                  className="group relative rounded-2xl overflow-hidden bg-surface-container-high cursor-pointer"
                >
                  {/* Contenedor de imagen con aspect ratio */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Imagen con zoom en hover */}
                    <motion.div
                      animate={{
                        scale: hoveredIndex === (index + 2) ? 1.1 : 1,
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="absolute inset-0"
                    >
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Overlay gradient */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === (index + 2) ? 0.8 : 0.3
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"
                    />

                    {/* Contenido hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: hoveredIndex === (index + 2) ? 1 : 0,
                        y: hoveredIndex === (index + 2) ? 0 : 20
                      }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-end p-8"
                    >
                      <div className="flex items-end justify-between w-full">
                        <div>
                          <h3 className="font-display text-2xl text-text-primary mb-2">
                            {project.title}
                          </h3>
                          <p className="font-body text-body-sm text-text-secondary">
                            {project.subtitle}
                          </p>
                        </div>
                        
                        {/* Botón de flecha */}
                        <motion.div
                          animate={{
                            scale: hoveredIndex === (index + 2) ? 1 : 0.8,
                            backgroundColor: hoveredIndex === (index + 2) ? '#BFFF0B' : 'rgba(62, 62, 62, 0.8)',
                          }}
                          transition={{ duration: 0.3 }}
                          className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
                        >
                          <ArrowUpRight 
                            className={`w-5 h-5 transition-colors duration-300 ${
                              hoveredIndex === (index + 2) ? 'text-[#0A0A0A]' : 'text-text-secondary'
                            }`}
                            strokeWidth={2}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Border glow en hover */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === (index + 2) ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 border-2 border-accent/30 rounded-2xl pointer-events-none"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/95 backdrop-blur-sm p-4 md:p-8"
          >
            {/* Contenedor del modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-surface-container-high rounded-2xl overflow-hidden border border-border-subtle"
            >
              {/* Botón cerrar */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-accent hover:text-[#0A0A0A] transition-all duration-300 group"
              >
                <X className="w-6 h-6" strokeWidth={2} />
              </motion.button>

              {/* Grid: Imagen + Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Imagen grande */}
                <div className="relative aspect-[4/3] lg:aspect-auto bg-surface-container-highest">
                  <img 
                    src={filteredProjects[selectedProject].image}
                    alt={filteredProjects[selectedProject].title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Información del proyecto */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-body text-label-caps text-accent uppercase tracking-widest mb-4 block"
                    >
                      {filteredProjects[selectedProject].category}
                    </motion.span>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-display text-4xl md:text-5xl text-text-primary mb-4"
                    >
                      {filteredProjects[selectedProject].title}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-body text-body-md text-text-secondary mb-4"
                    >
                      {filteredProjects[selectedProject].subtitle}
                    </motion.p>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="font-body text-body-lg text-text-primary leading-relaxed mb-8"
                    >
                      {filteredProjects[selectedProject].description}
                    </motion.p>

                    {/* Tags */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-2"
                    >
                      {filteredProjects[selectedProject].tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 + (tagIndex * 0.05) }}
                          className="px-4 py-2 bg-surface-container-highest border border-border-subtle rounded-full font-body text-body-sm text-text-primary"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>

                  {/* Botón CTA */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 w-full py-4 bg-accent hover:bg-accent-hover text-[#0A0A0A] font-body text-body-md font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Ver Proyecto Completo
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
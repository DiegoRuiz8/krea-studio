import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, X, ChevronDown } from "lucide-react";

const projects = [
  {
    title: "World Cup Nights",
    subtitle: "Reservas para experiencia nocturna en Guadalajara 2026",
    category: "Landing Page",
    description:
      "Sitio bilingüe (EN/ES) para un party bus durante el Mundial 2026, con selección de fecha, tickets por nivel, ruta, FAQ y reserva directa.",
    tags: ["Next.js", "Bilingüe", "Responsive"],
    image: "/projects/worldcupnights.jpg",
    url: "https://www.worldcupnights.lat/",
  },
  {
    title: "Landana",
    subtitle: "Fotografía y video aéreo para bienes raíces",
    category: "Landing Page",
    description:
      "Grabación de contenido con drone para inmobiliarias y otros clientes, con paquetes y precios claros, portafolio de propiedades y contacto directo por WhatsApp.",
    tags: ["React", "Vite", "Responsive"],
    image: "/projects/landana.jpg",
    url: "https://landana-sky.vercel.app/",
  },
];

const mainProjects = projects.slice(0, 3);
const extraProjects = projects.slice(3);

const ProjectCard = ({
  project,
  index,
  hoveredIndex,
  setHoveredIndex,
  onClickIndex,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
  onClickIndex: number;
  onClick: (i: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay: index * 0.08,
      ease: [0.22, 1, 0.36, 1],
    }}
    onMouseEnter={() => setHoveredIndex(onClickIndex)}
    onMouseLeave={() => setHoveredIndex(null)}
    onClick={() => onClick(onClickIndex)}
    className="group relative cursor-pointer"
  >
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface-container-high">
      <motion.div
        animate={{ scale: hoveredIndex === onClickIndex ? 1.06 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        animate={{ opacity: hoveredIndex === onClickIndex ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 border border-accent/40 rounded-2xl pointer-events-none"
      />
    </div>
    <div className="flex items-start justify-between gap-4 pt-4 px-1">
      <div>
        <h3 className="font-display text-xl md:text-2xl text-text-primary mb-1">
          {project.title}
        </h3>
        <p className="font-body text-sm text-white/55">{project.subtitle}</p>
      </div>
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/15 transition-all duration-300 group-hover:bg-[#BFFF0B] group-hover:border-[#BFFF0B]">
        <ArrowUpRight
          className="w-5 h-5 transition-colors duration-300 text-text-secondary group-hover:text-[#0A0A0A]"
          strokeWidth={2}
        />
      </div>
    </div>
  </motion.div>
);

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // mobile
  const [isExpanded, setIsExpanded] = useState(false); // desktop

  useEffect(() => {
    document.body.style.overflow =
      isSheetOpen || selectedProject !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen, selectedProject]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
        setIsSheetOpen(false);
        setHoveredIndex(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const closeModal = () => {
    setSelectedProject(null);
    setHoveredIndex(null);
  };
  const closeSheet = () => {
    setIsSheetOpen(false);
    setHoveredIndex(null);
  };

  return (
    <>
      <section
        id="portfolio"
        ref={ref}
        className="pt-16 md:pt-24 pb-16 md:pb-20 px-margin-mobile md:px-margin-desktop"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8 md:mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-label-caps text-accent uppercase tracking-widest mb-6 block"
            >
              • Portfolio
            </motion.span>
            <h2 className="font-display text-5xl md:text-6xl text-text-primary font-medium mb-4 md:mb-6">
              Proyectos Destacados
            </h2>
            <p className="hidden md:block font-body text-body-lg text-text-secondary max-w-2xl mx-auto">
              Sitios diseñados para verse bien, cargar rápido y funcionar en
              desktop y móvil.
            </p>
          </motion.div>

          {/* Grid principal — 3 cards */}
          <div
            className={`grid grid-cols-1 gap-6 ${
              mainProjects.length < 3
                ? "md:grid-cols-2 max-w-4xl mx-auto"
                : "md:grid-cols-3"
            }`}
          >
            {mainProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.25 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedProject(index);
                  setHoveredIndex(null);
                }}
                className="group relative cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-surface-container-high">
                  <motion.div
                    animate={{ scale: hoveredIndex === index ? 1.06 : 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 border border-accent/40 rounded-2xl pointer-events-none"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 pt-4 px-1">
                  <div>
                    <h3 className="font-display text-xl md:text-2xl text-text-primary mb-1">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-white/55">
                      {project.subtitle}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/15 transition-all duration-300 group-hover:bg-[#BFFF0B] group-hover:border-[#BFFF0B]">
                    <ArrowUpRight
                      className="w-5 h-5 transition-colors duration-300 text-text-secondary group-hover:text-[#0A0A0A]"
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Grid expandible — solo desktop */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                key="expanded-grid"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="hidden md:block overflow-hidden"
              >
                <div className="grid grid-cols-3 gap-6 mt-6">
                  {extraProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      onClickIndex={index + 3}
                      onClick={(i) => {
                        setSelectedProject(i);
                        setHoveredIndex(null);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón — comportamiento diferente por breakpoint */}
          {extraProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex justify-center"
            >
              {/* Mobile: abre bottom sheet */}
              <motion.button
                type="button"
                onClick={() => setIsSheetOpen(true)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="md:hidden rounded-full border border-white/15 px-7 py-3 font-body text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                Ver más proyectos
              </motion.button>

              {/* Desktop: expande/colapsa el grid */}
              <motion.button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 font-body text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
              >
                {isExpanded ? "Ver menos" : "Ver más proyectos"}
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Bottom sheet — mobile only, sin cambios */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            <motion.div
              key="sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeSheet}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              key="sheet-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#111111] border-t border-white/[0.08] rounded-t-3xl max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06] shrink-0">
                <div className="w-10 h-1 rounded-full bg-white/20" />
                <button
                  onClick={closeSheet}
                  className="w-8 h-8 flex items-center justify-center text-text-primary/50 hover:text-text-primary transition-colors ml-auto"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 px-6 py-6">
                <div className="grid grid-cols-1 gap-5">
                  {extraProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      index={index}
                      hoveredIndex={hoveredIndex}
                      setHoveredIndex={setHoveredIndex}
                      onClickIndex={index + 100}
                      onClick={(i) => {
                        setSelectedProject(i - 100 + 3);
                        setHoveredIndex(null);
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal detalle */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-[#0A0A0A]/95 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-surface-container-high rounded-2xl overflow-hidden border border-border-subtle my-auto"
            >
              {/* X — más chica y pegada al borde para que quepa en mobile */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center text-text-primary hover:bg-accent hover:text-[#0A0A0A] transition-all duration-300"
              >
                <X className="w-5 h-5" strokeWidth={2} />
              </motion.button>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto bg-surface-container-highest">
                  <img
                    src={projects[selectedProject].image}
                    alt={projects[selectedProject].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-12 flex flex-col justify-between">
                  <div>
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-body text-label-caps text-accent uppercase tracking-widest mb-4 block"
                    >
                      {projects[selectedProject].category}
                    </motion.span>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="font-display text-3xl md:text-5xl text-text-primary mb-4"
                    >
                      {projects[selectedProject].title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="font-body text-body-md text-text-secondary mb-4"
                    >
                      {projects[selectedProject].subtitle}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                      className="font-body text-body-md text-text-primary leading-relaxed mb-6"
                    >
                      {projects[selectedProject].description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-2"
                    >
                      {projects[selectedProject].tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.45 + tagIndex * 0.05 }}
                          className="px-4 py-2 bg-surface-container-highest border border-border-subtle rounded-full font-body text-body-sm text-text-primary"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                  <motion.a
                    href={projects[selectedProject].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 w-full py-4 bg-accent hover:bg-accent-hover text-[#0A0A0A] font-body text-body-md font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Ver Proyecto Completo
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </motion.a>
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

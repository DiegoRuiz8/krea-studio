import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { EASE_OUT, lockScroll, useMediaQuery } from "../lib/motion";
import { SplitWords } from "./Reveal";

const projects = [
  {
    title: "EspaXio Inmobiliaria",
    subtitle:
      "Inmobiliaria y administración de condominios en CDMX y Edo. Méx.",
    category: "Landing Page",
    description:
      "Sitio para una inmobiliaria con catálogo de propiedades en venta y renta, servicios de administración de condominios, gestión de créditos y contacto directo por WhatsApp.",
    tags: ["Next.js", "Catálogo", "Responsive"],
    image: "/projects/espaxio.jpg",
    url: "https://www.espaxioinmobiliaria.com/es",
  },
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
    title: "Luis Felipe IV",
    subtitle: "Historias musicales y comunidad en torno a las canciones",
    category: "Sitio Personal",
    description:
      "Sitio para un creador de contenido musical con archivo de videos destacados, historias de la comunidad, buzón para dedicar canciones con búsqueda en Spotify y newsletter.",
    tags: ["Next.js", "Spotify", "Newsletter"],
    image: "/projects/luisfelipeiv.jpg",
    url: "https://www.luisfelipeiv.com/",
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

const VISIBLE_LIMIT = 6;

const visibleProjects = projects.slice(0, VISIBLE_LIMIT);

type Project = (typeof projects)[number];

const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group block w-[82vw] shrink-0 snap-start text-left md:w-[min(58vw,960px)]"
  >
    <span className="relative block aspect-[16/10] overflow-hidden bg-surface">
      <img
        src={project.image}
        alt={project.title}
        width={1600}
        height={1200}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </span>
    <span className="mt-5 flex items-start justify-between gap-6">
      <span>
        <span className="block text-2xl font-bold tracking-[-0.03em] text-ink md:text-4xl">
          {project.title}
        </span>
        <span className="mt-1 block text-base text-ink-soft md:text-lg">{project.subtitle}</span>
      </span>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface-raised text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-on-accent">
        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2} />
      </span>
    </span>
  </button>
);

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    onClick={onClose}
    data-lenis-prevent
    className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto overscroll-contain bg-ground/95 p-4 md:p-8"
  >
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      onClick={(e) => e.stopPropagation()}
      className="relative my-auto grid w-full max-w-6xl bg-surface lg:grid-cols-2"
    >
      <button
        ref={(el) => el?.focus({ preventScroll: true })}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center bg-ground text-ink transition-colors duration-200 hover:bg-accent hover:text-on-accent"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>
      <div className="aspect-[4/3] bg-surface-raised lg:aspect-auto">
        <img src={project.image} alt={project.title} width={1600} height={1200} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between gap-8 p-6 md:p-12">
        <div>
          <p className="mb-4 text-base font-semibold text-accent">{project.category}</p>
          <h3 className="mb-4 text-3xl font-extrabold tracking-[-0.03em] text-ink md:text-5xl">
            {project.title}
          </h3>
          <p className="mb-4 text-lg text-ink-soft">{project.subtitle}</p>
          <p className="mb-6 text-base leading-relaxed text-ink md:text-lg">{project.description}</p>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="bg-surface-raised px-4 py-2 text-sm text-ink">
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-center gap-2 bg-accent py-4 text-base font-semibold text-on-accent active:scale-[0.98]"
        >
          Ver Proyecto Completo
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

const Portfolio = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [distance, setDistance] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track || !isDesktop) {
      setDistance(0);
      return;
    }
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop]);

  useEffect(() => {
    lockScroll(selected !== null);
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [selected]);

  return (
    <>
      <section
        id="portfolio"
        ref={wrapRef}
        className="relative z-10"
        style={isDesktop ? { height: `calc(100vh + ${distance}px)` } : undefined}
      >
        <div className="flex flex-col justify-center py-28 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0">
          <div className="mb-10 flex flex-col gap-4 px-gutter md:mb-14 md:flex-row md:items-end md:justify-between">
            <SplitWords
              text="Proyectos Destacados"
              className="text-[clamp(40px,5.4vw,96px)] font-extrabold leading-[0.95] tracking-[-0.04em] text-ink md:font-wide"
            />
            <p className="max-w-[40ch] text-base text-ink md:text-lg">
              Sitios diseñados para verse bien, cargar rápido y funcionar en
              desktop y móvil.
            </p>
          </div>

          <motion.div
            ref={trackRef}
            style={isDesktop ? { x } : undefined}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-gutter px-gutter md:w-max md:snap-none md:gap-10 md:overflow-visible"
          >
            {visibleProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} onOpen={() => setSelected(index)} />
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <ProjectModal project={projects[selected]} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;

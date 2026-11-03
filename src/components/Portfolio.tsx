import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
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

type Project = (typeof projects)[number];

/* Cada proyecto es una página fija; la siguiente se desliza encima y la anterior se hunde */
const ProjectPage = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <article
      ref={ref}
      className={`relative md:sticky md:top-0 md:h-[100svh] md:overflow-hidden ${
        index % 2 ? "bg-surface" : "bg-ground"
      }`}
    >
      <motion.div
        style={reduced ? undefined : { scale, y }}
        className="grid h-full origin-top gap-8 px-gutter py-14 md:grid-cols-axis md:gap-0 md:py-24"
      >
        <div className="flex flex-col justify-end md:order-none md:pr-12">
          <p className="text-base font-semibold text-ink-soft">{project.category}</p>
          <h3 className="mt-3 font-serif text-[clamp(40px,4.4vw,80px)] leading-[0.95] tracking-[-0.02em] text-ink">
            {project.title}
          </h3>
          <p className="mt-4 text-lg text-ink">{project.subtitle}</p>
          <p className="mt-4 text-base leading-relaxed text-ink md:text-lg">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="bg-surface-raised px-3 py-1.5 text-sm text-ink">
                {tag}
              </li>
            ))}
          </ul>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex w-fit items-center gap-2 bg-ink px-6 py-4 text-base font-semibold text-ground transition-[transform,background-color,color] duration-200 ease-out hover:bg-accent hover:text-on-accent active:scale-[0.97]"
          >
            Ver Proyecto Completo
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="group order-first block overflow-hidden bg-surface-raised md:order-none md:h-full"
        >
          <img
            src={project.image}
            alt=""
            width={1600}
            height={1200}
            loading="lazy"
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] md:aspect-auto"
          />
        </a>
      </motion.div>
    </article>
  );
};

const Portfolio = () => (
  <section id="portfolio" className="relative z-10">
    <div className="grid px-gutter pb-16 pt-28 md:grid-cols-axis md:pb-24 md:pt-40">
      <p className="mb-6 max-w-[34ch] self-end text-lg text-ink md:mb-0 md:pr-10">
        Sitios diseñados para verse bien, cargar rápido y funcionar en
        desktop y móvil.
      </p>
      <SplitWords
        text="Proyectos Destacados"
        className="order-first font-serif text-[clamp(48px,7vw,132px)] leading-[0.9] tracking-[-0.02em] text-ink md:order-none"
      />
    </div>

    <div>
      {projects.slice(0, VISIBLE_LIMIT).map((project, index) => (
        <ProjectPage key={project.title} project={project} index={index} />
      ))}
    </div>
  </section>
);

export default Portfolio;

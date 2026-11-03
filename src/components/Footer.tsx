import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { EASE_OUT } from "../lib/motion";

const contactLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/studioskrea?igsh=dHFtaGdiYnU5OTR0",
    label: "Instagram",
    external: true,
  },
  {
    icon: Mail,
    href: "mailto:hola@studioskrea.com",
    label: "Email",
    external: false,
  },
];

const navLinks = [
  { name: "Servicios", href: "#servicios" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Proceso", href: "#proceso" },
  { name: "Contacto", href: "#contacto" },
];

/* Cierre a dos tintas: pliego negro con el nombre a todo lo ancho */
const Footer = () => (
  <footer className="relative z-10 overflow-hidden bg-ink px-gutter pt-16 text-ground md:pt-24">
    <div className="grid gap-10 md:grid-cols-axis md:gap-0">
      <p className="max-w-xs text-lg">
        Sitios web y automatización con IA para negocios que quieren vender más.
      </p>

      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-base transition-colors duration-200 hover:text-accent">
              {link.name}
            </a>
          ))}
        </nav>
        <div className="flex gap-2">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="flex h-11 w-11 items-center justify-center bg-ground/10 transition-colors duration-200 hover:bg-accent hover:text-on-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>

    <a href="#" aria-label="Krea.Studios, volver arriba" className="mt-16 block overflow-hidden md:mt-24">
      <motion.span
        initial={{ y: "70%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="block whitespace-nowrap font-serif text-[clamp(64px,22.5vw,440px)] leading-[0.82] tracking-[-0.03em]"
      >
        Krea<span className="text-accent">.</span>Studios
      </motion.span>
    </a>

    <p className="py-6 text-sm text-ground/70">
      © {new Date().getFullYear()} Krea.Studios. Todos los derechos reservados.
    </p>
  </footer>
);

export default Footer;

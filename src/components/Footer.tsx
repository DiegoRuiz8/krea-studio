import { motion } from 'framer-motion';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const contactLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/studioskrea?igsh=dHFtaGdiYnU5OTR0',
      label: 'Instagram',
      external: true,
    },
    {
      icon: Mail,
      href: 'mailto:hola@studioskrea.com',
      label: 'Email',
      external: false,
    },
  ];

  const navLinks = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Proceso', href: '#proceso' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="py-7 md:py-10 flex flex-col md:flex-row justify-between gap-6">
          {/* Brand */}
          <div>
            <motion.a
              href="#"
              whileHover={{ opacity: 0.8 }}
              className="font-display text-headline-sm font-bold text-text-primary inline-block mb-2"
            >
              Krea<span className="text-accent">.</span>Studios
            </motion.a>
            <p className="font-body text-body-sm text-text-secondary max-w-xs">
              Diseño web para negocios que quieren vender más.
            </p>
          </div>

          {/* Nav + iconos */}
          <div className="flex flex-col md:items-end gap-4">
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ color: '#BFFF0B' }}
                  className="font-body text-sm text-text-secondary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <div className="flex gap-4">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ y: -2, color: '#BFFF0B' }}
                    whileTap={{ scale: 0.96 }}
                    className="text-text-secondary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="py-4 border-t border-white/10">
          <p className="font-body text-xs text-text-secondary">
            © {new Date().getFullYear()} Krea.Studios. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
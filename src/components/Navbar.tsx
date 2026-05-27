import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Servicios', href: '#servicios', chevron: true },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Proceso', href: '#proceso' },
  { name: 'Contacto', href: '#contacto', chevron: true },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/75 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="justify-self-start font-display text-2xl font-semibold tracking-tight text-text-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Krea <span className="text-accent">Studios</span>
          </motion.a>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 text-sm font-body font-semibold text-text-primary/85 hover:text-text-primary transition-colors"
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -1 }}
              >
                {link.name}
                {link.chevron && (
                  <span className="text-xs opacity-70 translate-y-[1px]">
                    ▾
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 24px rgba(191, 255, 11, 0.35)',
            }}
            whileTap={{ scale: 0.96 }}
            className="justify-self-end bg-accent hover:bg-accent-hover text-[#0A0A0A] px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider transition-all duration-300"
          >
            Iniciar Proyecto
          </motion.a>
        </div>
      </div>

      {/* Divider line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </motion.nav>
  );
};

export default Navbar;
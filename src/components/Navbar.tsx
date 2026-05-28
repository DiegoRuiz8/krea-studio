import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Servicios", href: "#servicios" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Proceso", href: "#proceso" },
  { name: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isOpen ? "bg-[#0A0A0A]/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <motion.a
              href="#"
              onClick={closeMenu}
              className="font-display text-2xl md:text-[28px] font-bold tracking-[-0.04em] text-text-primary flex items-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Krea</span>
              <span className="text-accent">.</span>
              <span>Studios</span>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-body font-semibold text-text-primary/85 hover:text-text-primary transition-colors"
                  initial={{ opacity: 0, y: -14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -1 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Desktop CTA */}
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(191, 255, 11, 0.35)" }}
              whileTap={{ scale: 0.96 }}
              className="hidden md:block bg-accent hover:bg-accent-hover text-[#0A0A0A] px-6 py-3 rounded-full font-body font-bold text-xs uppercase tracking-wider transition-all duration-300"
            >
              Iniciar Proyecto
            </motion.a>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block w-6 h-[2px] bg-text-primary origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block w-6 h-[2px] bg-text-primary"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block w-6 h-[2px] bg-text-primary origin-center"
              />
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Slide panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-[75vw] max-w-[320px] bg-[#0F0F0F] border-l border-white/[0.06] flex flex-col md:hidden"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 h-20 border-b border-white/[0.06]">
              <span className="font-display text-sm font-bold tracking-[-0.02em] text-text-primary">
                Krea<span className="text-accent">.</span>Studios
              </span>
              <button
                onClick={closeMenu}
                className="w-8 h-8 flex items-center justify-center text-text-primary/60 hover:text-text-primary transition-colors"
                aria-label="Cerrar menú"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 pt-8 gap-1 flex-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between py-4 border-b border-white/[0.05] font-display text-2xl font-medium text-text-primary/80 hover:text-text-primary transition-colors"
                >
                  {link.name}
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity text-lg">→</span>
                </motion.a>
              ))}
            </nav>

            {/* CTA */}
            <div className="px-6 pb-10 pt-6">
              <motion.a
                href="#contacto"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.3 }}
                whileTap={{ scale: 0.97 }}
                className="block w-full text-center bg-accent text-[#0A0A0A] py-4 rounded-full font-body font-bold text-xs uppercase tracking-wider"
              >
                Iniciar Proyecto
              </motion.a>
              <p className="text-center text-white/25 text-xs font-mono mt-4 tracking-widest uppercase">
                Guadalajara · MX
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
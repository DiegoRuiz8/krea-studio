import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { EASE_OUT, lockScroll } from "../lib/motion";

const navLinks = [
  { name: "Servicios", href: "#servicios" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Proceso", href: "#proceso" },
  { name: "Contacto", href: "#contacto" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsScrolled(y > 40);
    setIsHidden(y > 400 && y > previous);
  });

  useEffect(() => {
    lockScroll(isOpen);
    return () => lockScroll(false);
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: isHidden && !isOpen ? -80 : 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isScrolled || isOpen ? "bg-ground" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-gutter md:h-20">
          <a href="#" onClick={closeMenu} className="font-serif text-[28px] leading-none text-ink md:text-[32px]">
            Krea<span className="text-ink-soft">.</span>Studios
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="group relative text-[15px] font-medium text-ink">
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <a
            href="#contacto"
            className="hidden bg-ink px-5 py-3 text-sm font-semibold text-ground transition-[transform,background-color,color] duration-200 ease-out hover:bg-accent hover:text-on-accent active:scale-[0.97] md:block"
          >
            Iniciar Proyecto
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="block h-[2px] w-6 bg-ink"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-6 bg-ink"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="block h-[2px] w-6 bg-ink"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="fixed inset-0 z-40 flex flex-col bg-ground px-gutter pb-10 pt-24 md:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.12 + index * 0.06, ease: EASE_OUT }}
                  className="py-1 font-serif text-[56px] leading-none text-ink"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contacto"
              onClick={closeMenu}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="block bg-accent py-4 text-center text-base font-semibold text-on-accent active:scale-[0.98]"
            >
              Iniciar Proyecto
            </motion.a>
            <p className="mt-4 text-center text-sm text-ink-soft">Guadalajara, MX</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

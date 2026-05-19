import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    servicios: [
      { name: 'Diseño Web', href: '#servicios' },
      { name: 'Desarrollo', href: '#servicios' },
      { name: 'E-commerce', href: '#servicios' },
    ],
    empresa: [
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Proceso', href: '#proceso' },
      { name: 'Contacto', href: '#contacto' },
    ]
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:hola@kreastudio.com', label: 'Email' },
  ];

  return (
    <footer className="bg-surface-container-lowest border-t border-border-subtle">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-2">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="font-display text-headline-sm font-bold text-text-primary mb-4 inline-block cursor-pointer"
            >
              Krea Studio
            </motion.h3>
            <p className="font-body text-body-md text-text-secondary max-w-md mb-6">
              Transformamos ideas en experiencias digitales memorables. 
              Diseño y desarrollo web de alta calidad.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -3, color: '#BFFF0B' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-text-secondary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-body text-label-caps text-text-primary uppercase tracking-wider mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#BFFF0B' }}
                    className="font-body text-body-md text-text-secondary transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-label-caps text-text-primary uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#BFFF0B' }}
                    className="font-body text-body-md text-text-secondary transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-body-md text-text-secondary text-sm">
            © {new Date().getFullYear()} Krea Studio. Todos los derechos reservados.
          </p>
          
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ color: '#BFFF0B' }}
              className="font-body text-body-md text-text-secondary text-sm transition-colors"
            >
              Privacidad
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: '#BFFF0B' }}
              className="font-body text-body-md text-text-secondary text-sm transition-colors"
            >
              Términos
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { EASE_OUT } from "../lib/motion";

const wordVariants: Variants = {
  hidden: { y: "105%" },
  visible: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.045 },
  }),
};

interface SplitWordsProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

/* Titular que entra palabra por palabra desde una máscara */
export const SplitWords = ({ text, as: Tag = "h2", className, delay = 0 }: SplitWordsProps) => {
  const lines = text.split("\n");
  let index = Math.round(delay / 0.045);

  return (
    <Tag className={className}>
      <motion.span
        className="block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      >
        {lines.map((line, l) => (
          <span key={l} className="block">
            {line.split(" ").map((word, w) => (
              <span key={w} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-top">
                <motion.span className="inline-block" variants={wordVariants} custom={index++}>
                  {word}
                </motion.span>
                {w < line.split(" ").length - 1 ? " " : null}
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/* Entrada de un bloque: sube y aparece una sola vez */
export const Reveal = ({ children, className, delay = 0, y = 24 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 0.8, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

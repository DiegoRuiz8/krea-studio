import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const STARTS = [0.3, 0, 0.42, 0.12, 0.5, 0.2, 0.36, 0.06];

const Strip = ({ progress, start }: { progress: MotionValue<number>; start: number }) => {
  const scaleY = useTransform(progress, [start, start + 0.5], [0, 1], { clamp: true });
  return <motion.span style={{ scaleY }} className="-mr-px h-full flex-1 origin-bottom bg-ground" />;
};

/*
 * Borde superior de un campo de color: franjas del color nuevo suben
 * escalonadas sobre el campo anterior conforme la sección entra.
 */
export const FieldEdge = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0">
      {!reduced && (
        <div className="absolute inset-x-0 bottom-0 flex h-[13vh] items-end md:h-[26vh] overflow-hidden">
          {STARTS.map((start) => (
            <Strip key={start} progress={scrollYProgress} start={start} />
          ))}
        </div>
      )}
    </div>
  );
};

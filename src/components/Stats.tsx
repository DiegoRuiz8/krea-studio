import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE_OUT } from "../lib/motion";

interface StatCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const StatCounter = ({ end, prefix = "", suffix = "", duration = 2 }: StatCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, end, { duration, ease: EASE_OUT });
    return controls.stop;
  }, [isInView, count, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const stats = [
  { value: 100, suffix: "%", label: "Hecho a medida", duration: 2 },
  { value: 0, prefix: "$", label: "Costos ocultos", duration: 2.5 },
  { value: 5, label: "Días para lanzar tu sitio", duration: 1.5 },
];

/* Un pliego lima que sube desde abajo, como tinta directa sobre el papel */
const Stats = () => {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 20%"] });
  const clipPath = useTransform(scrollYProgress, (v) => `inset(${(1 - v) * 100}% 0 0 0)`);

  return (
    <section ref={ref} aria-label="En números" className="relative z-10">
      <motion.div
        style={reduced ? undefined : { clipPath }}
        className="bg-accent px-gutter py-24 text-on-accent md:py-36"
      >
        <dl className="grid gap-12 sm:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.09, ease: EASE_OUT }}
              className="flex flex-col"
            >
              <dt className="order-2 mt-3 text-lg font-medium md:text-xl">{stat.label}</dt>
              <dd className="order-1 tabular font-serif text-[clamp(96px,10vw,190px)] leading-[0.85] tracking-[-0.03em]">
                <StatCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={stat.duration} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
};

export default Stats;

import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
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

/* Cierra el campo lima que abrió el recorrido de servicios */
const Stats = () => (
    <section data-field aria-label="En números" className="field-accent relative bg-ground">
      <div className="relative z-10 px-gutter pb-[17vh] pt-10 md:pb-[32vh] md:pt-32">
        <dl className="grid gap-7 md:grid-cols-3 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: index * 0.09, ease: EASE_OUT }}
              className="flex flex-col"
            >
              <dt className="order-2 mt-2 text-lg font-semibold md:text-xl">{stat.label}</dt>
              <dd className="order-1 tabular text-[clamp(88px,9.5vw,180px)] font-extrabold leading-[0.85] tracking-[-0.06em] font-wide">
                <StatCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={stat.duration}
                />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
);

export default Stats;

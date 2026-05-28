import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const VIDEO_URL = "/videos/ParticleWave.mp4";
const POSTER_URL = "/particle-wave-poster.webp";

const StatCounter = ({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
}: StatCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, end, duration]);

  return (
    <motion.span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    const playPromise = v.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const tryPlay = () => {
          v.play().catch(() => {});
          window.removeEventListener("scroll", tryPlay);
          window.removeEventListener("touchstart", tryPlay);
        };
        window.addEventListener("scroll", tryPlay, { passive: true, once: true });
        window.addEventListener("touchstart", tryPlay, { passive: true, once: true });
      });
    }
  }, []);

  const stats = [
    {
      value: 100,
      suffix: "%",
      label: "Diseño a medida",
      duration: 2,
    },
    {
      value: 0,
      prefix: "$",
      label: "Costos ocultos",
      duration: 2.5,
    },
    {
      value: 5,
      suffix: "",
      label: "Días de entrega",
      duration: 1.5,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden bg-[#0A0A0A] min-h-[50vh] md:min-h-[65vh] py-8 md:py-32"
    >
      <video
        ref={videoRef}
        src={VIDEO_URL}
        poster={POSTER_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-75 transform-gpu will-change-transform"
      />

      <div className="absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent" />

      <div className="max-w-container-max mx-auto relative z-10 px-margin-mobile md:px-margin-desktop w-full mt-8 md:mt-0"
>
        <div className="grid grid-cols-3 gap-2 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 36 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <motion.div
                className="font-display text-[clamp(36px,9vw,48px)] md:text-display-xl text-accent mb-3 font-bold"
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <StatCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={stat.duration}
                />
              </motion.div>

              <div className="font-body text-xs md:text-body-lg text-text-secondary font-semibold leading-snug">
                {stat.label}
              </div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                transition={{
                  duration: 1,
                  delay: index * 0.15 + 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="w-10 md:w-14 h-[3px] bg-accent/35 mx-auto mt-4 origin-center"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
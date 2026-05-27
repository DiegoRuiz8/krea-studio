import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const VIDEO_URL = "/videos/ParticleWave.mp4";
const POSTER_URL = "/videos/particle-wave-poster.webp";

const StatCounter = ({ end, suffix = "", duration = 2 }: StatCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const videoRef = useRef<HTMLVideoElement>(null);

  // Asegura autoplay en navegadores estrictos (Safari iOS, algunos Chrome)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Si el autoplay falla, intentamos de nuevo al primer scroll/touch
        const tryPlay = () => {
          v.play().catch(() => {});
          window.removeEventListener("scroll", tryPlay);
          window.removeEventListener("touchstart", tryPlay);
        };
        window.addEventListener("scroll", tryPlay, {
          passive: true,
          once: true,
        });
        window.addEventListener("touchstart", tryPlay, {
          passive: true,
          once: true,
        });
      });
    }
  }, []);

  const stats = [
    {
      value: 50,
      suffix: "+",
      label: "Proyectos Entregados",
      duration: 2,
    },
    {
      value: 98,
      suffix: "%",
      label: "Clientes Satisfechos",
      duration: 2.5,
    },
    {
      value: 2,
      suffix: "x",
      label: "Aumento en Conversión",
      duration: 1.5,
    },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[82vh] flex items-center justify-center border-t border-border-subtle my-section-gap overflow-hidden bg-[#0A0A0A] pt-24 md:pt-32"
    >
      {/* Video de partículas */}
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
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.65) 38%, black 52%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.65) 38%, black 52%, black 100%)",
        }}
      />

      {/* Malla sutil superior */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
    `,
    backgroundSize: "80px 80px",
    WebkitMaskImage:
      "linear-gradient(to bottom, black 0%, black 25%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.15) 58%, transparent 75%)",
    maskImage:
      "linear-gradient(to bottom, black 0%, black 25%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.15) 58%, transparent 75%)",
  }}
/>

      {/* Glow verde suave */}
      <div
        aria-hidden
        className="absolute left-1/2 bottom-[-18%] h-[520px] w-[900px] -translate-x-1/2 rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, rgba(191,255,11,0.16), transparent 72%)",
          filter: "blur(80px)",
        }}
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/35 to-[#0A0A0A]/70" />

      {/* Contenido principal */}
      <div className="max-w-container-max mx-auto relative z-10 px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center py-6 md:py-0"
            >
              <motion.div
                className="font-display text-display-xl-mobile md:text-display-xl text-accent mb-4 font-bold relative"
                initial={{ textShadow: "0 0 0px rgba(191, 255, 11, 0)" }}
                animate={
                  isInView
                    ? {
                        textShadow: [
                          "0 0 0px rgba(191, 255, 11, 0)",
                          "0 0 40px rgba(191, 255, 11, 0.7)",
                          "0 0 20px rgba(191, 255, 11, 0.4)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <StatCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={stat.duration}
                />
              </motion.div>

              <div className="font-body text-body-lg text-text-secondary font-semibold">
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
                className="w-16 h-1 bg-accent/30 mx-auto mt-6 origin-center"
                style={{
                  boxShadow: "0 0 10px rgba(191, 255, 11, 0.3)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

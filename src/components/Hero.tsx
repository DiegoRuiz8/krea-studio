import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const VIDEO_URL = "/videos/bg-video-hero-section.mp4";
const POSTER_URL = "/videos/particle-wave-poster.webp";

function useVideoFadeLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.style.opacity = "0";

    let raf = 0;
    const FADE = 0.5;

    const tick = () => {
      if (!video.duration || Number.isNaN(video.duration)) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = video.currentTime;
      const d = video.duration;

      let opacity = 1;

      if (t < FADE) {
        opacity = t / FADE;
      } else if (t > d - FADE) {
        opacity = Math.max(0, (d - t) / FADE);
      }

      video.style.opacity = String(opacity);
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      video.style.opacity = "0";

      window.setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 100);
    };

    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return ref;
}

const Hero = () => {
  const videoRef = useVideoFadeLoop();

  return (
<section className="relative min-h-[100svh] flex items-center justify-center overflow-clip bg-[#0A0A0A] px-5 sm:px-6 pt-24 md:pt-24 pb-8 md:pb-16">      {" "}
      {/* Background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-90 scale-[1.28] translate-y-[10%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.75) 34%, black 48%, black 82%, rgba(0,0,0,0.35) 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.35) 20%, rgba(0,0,0,0.75) 34%, black 48%, black 82%, rgba(0,0,0,0.35) 94%, transparent 100%)",
          }}
        />
        {/* Glows plata/gunmetal */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(166,169,173,0.18), transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-24 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(58,61,64,0.55), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Glow verde sutil */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 w-[680px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(198,255,0,0.12), transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-10 right-10 w-[280px] h-[280px] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(191,255,11,0.10), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Overlay para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0A0A0A]" />
        <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        {" "}
      </div>
      {/* Contenido principal */}
      <div className="relative z-10 max-w-container-max mx-auto w-full">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-label-caps text-accent uppercase tracking-[0.18em] mb-6 block"
          >
            Agencia de Desarrollo Web
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-semibold text-text-primary text-[clamp(44px,8.2vw,118px)] leading-[0.98] tracking-[-0.035em]"
          >
            Creamos experiencias web{" "}
            <span className="text-accent italic font-medium">
              que convierten
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-body text-base md:text-lg text-text-secondary leading-7 md:leading-8 max-w-xl mx-auto mt-5 md:mt-6 opacity-90"
          >
            Tu competencia ya tiene sitio web. Nosotros hacemos que el tuyo sea
            el que vende. Sin plantillas, sin intermediarios, precio fijo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
className="flex flex-row flex-wrap items-center justify-center gap-3 mt-7 md:mt-8"          >
            <motion.a
              href="#contacto"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 30px rgba(191, 255, 11, 0.35)",
              }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full bg-accent hover:bg-accent-hover text-[#0A0A0A] px-7 md:px-8 py-4 font-body font-semibold tracking-wide uppercase text-xs md:text-sm transition-all duration-300"
            >
              Agendar Consulta
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{
                scale: 1.04,
                borderColor: "#BFFF0B",
              }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-white/20 bg-white/[0.03] hover:bg-white/[0.07] hover:border-accent text-text-primary px-7 md:px-8 py-4 font-body font-semibold tracking-wide uppercase text-xs md:text-sm transition-all duration-300 backdrop-blur-sm"
            >
              Ver Portfolio
            </motion.a>
          </motion.div>
        </div>
      </div>
       <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-[#0A0A0A] to-transparent z-10" />
    </section>
  );
};

export default Hero;

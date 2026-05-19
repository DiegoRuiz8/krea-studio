import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface StatCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

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

// Hook para el efecto de partículas Three.js
const useParticleWave = (
  containerRef: React.RefObject<HTMLDivElement>,
  isInView: boolean,
) => {
  useEffect(() => {
    if (!containerRef.current || !isInView) return;

    const container = containerRef.current;

    // Setup de la escena
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      2000,
    );
    camera.position.z = 400;

    // Renderer con alpha para transparencia
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometría de las partículas - distribución en grid
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const initialPositions: number[] = [];

    // Grid más denso pero optimizado
    const particleCount = 4000;
    const gridSize = Math.ceil(Math.sqrt(particleCount));
    const gridSpacing = 40;
    const halfGrid = (gridSize * gridSpacing) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = i * gridSpacing - halfGrid;
        const y = j * gridSpacing - halfGrid;
        const z = 0;

        positions.push(x, y, z);
        initialPositions.push(x, y, z);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    // Material de las partículas con el color accent
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#BFFF0B"),
      size: 1.2,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    // Crear el sistema de partículas
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationTime = 0;
    let animationId: number;

    // Animación
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      animationTime += 0.003;

      const positions = particles.geometry.attributes.position.array;

      // Aplicar onda sinusoidal a cada partícula
      for (let i = 0; i < positions.length; i += 3) {
        const x = initialPositions[i];
        const y = initialPositions[i + 1];

        // Calcular desplazamiento en Z basado en posición XY y tiempo
        const distance = Math.sqrt(x * x + y * y);
        const wave = Math.sin(distance * 0.008 + animationTime * 3);

        positions[i + 2] = wave * 25;
      }

      particles.geometry.attributes.position.needsUpdate = true;

      // Rotación muy sutil del sistema completo
      particles.rotation.z = animationTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Manejo de resize
    const handleResize = () => {
      if (!container) return;

      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [containerRef, isInView]);
};

const Stats = () => {
  const ref = useRef(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Inicializar el efecto de partículas
  useParticleWave(particleContainerRef, isInView);

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
      className="relative min-h-screen flex items-center justify-center border-t border-border-subtle my-section-gap overflow-hidden bg-bg-primary"
    >
      {/* Canvas de Three.js para partículas - posicionado en la parte inferior */}
      <div
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 50%, transparent 80%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 50%, transparent 80%)",
        }}
      />

      {/* Grid sutil de fondo - SOLO parte superior con fade hacia abajo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 30%, transparent 60%)",
        }}
      />

      {/* Contenido principal - centrado verticalmente */}
      <div className="max-w-container-max mx-auto relative z-10 px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center py-8 md:py-0"
            >
              {/* Número con count-up y glow effect */}
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

              {/* Label */}
              <div className="font-body text-body-lg text-text-secondary font-semibold">
                {stat.label}
              </div>

              {/* Decorative line */}
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

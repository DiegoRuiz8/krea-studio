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

    // Malla con perspectiva: puntos más separados abajo y más comprimidos arriba
    const rows = 22;
    const cols = 38;

    const widthNear = 1900; // parte baja: más cerca, más abierta
    const widthFar = 1650; // parte alta: más lejos, más comprimida
    const height = 760;

    for (let row = 0; row < rows; row++) {
      const v = row / (rows - 1); // 0 = abajo/cerca, 1 = arriba/lejos

      // Perspectiva: abajo más ancho, arriba más estrecho
      const rowWidth = THREE.MathUtils.lerp(widthNear, widthFar, v);

      // Espaciado vertical no lineal: abajo más separado, arriba más pegado
      const perspectiveY = Math.pow(v, 0.82);
      const y = -height / 2 + perspectiveY * height;

      for (let col = 0; col < cols; col++) {
        const u = col / (cols - 1);

        // X centrado con una ligera curva para que no parezca grid perfecto
        const x =
          (u - 0.5) * rowWidth +
          Math.sin(v * Math.PI) * Math.sin(u * Math.PI * 2) * 18;

        // Z base: abajo más cerca de cámara, arriba más lejos
        const z = THREE.MathUtils.lerp(160, -260, v);

        positions.push(x, y, z);
        initialPositions.push(x, y, z);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    // Material de partículas estilo referencia: blanco/gris, más grandes y sutiles
    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#E5E7EB"),
      size: 2.4,
      transparent: true,
      opacity: 0.42,
      sizeAttenuation: true,
      blending: THREE.NormalBlending,
    });

    // Crear el sistema de partículas
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationTime = 0;
    let animationId: number;

    // Animación
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      animationTime += 0.008; // más rápido

      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const baseX = initialPositions[i];
        const baseY = initialPositions[i + 1];
        const baseZ = initialPositions[i + 2];

        // Normalizamos Y: 0 = abajo/cerca, 1 = arriba/lejos
        const v = (baseY + height / 2) / height;

        // Onda que viaja desde abajo hacia arriba
        const travelingWave = Math.sin(v * 9.5 - animationTime * 2);

        // La onda pega más fuerte abajo y se disuelve hacia arriba
        const waveStrength = THREE.MathUtils.lerp(32, 8, v);

        // Pequeña onda lateral para que no parezca una cuadrícula perfecta
        const sideRipple =
          Math.sin(baseX * 0.006 + animationTime * 1.4) * 7 * (1 - v);

        positions[i] = baseX + sideRipple;
        positions[i + 1] = baseY;

        // Aquí está la "tela": la onda empuja hacia cámara y se propaga hacia atrás
        positions[i + 2] = baseZ + travelingWave * waveStrength;
      }

      particles.geometry.attributes.position.needsUpdate = true;

      // Rotación/perspectiva fija: como si viéramos la tela desde arriba/frente
      particles.rotation.x = -0.72;
      particles.rotation.z = 0.015;

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
      className="relative min-h-[82vh] flex items-center justify-center border-t border-border-subtle my-section-gap overflow-hidden bg-bg-primary pt-24 md:pt-32"
    >
      {/* Canvas de Three.js para partículas - entra suavemente desde la mitad hacia abajo */}
      <div
        ref={particleContainerRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 26%, rgba(0,0,0,0.55) 38%, black 52%, black 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.12) 26%, rgba(0,0,0,0.55) 38%, black 52%, black 100%)",
        }}
      />

      {/* Grid sutil de fondo - baja más y se difumina hacia las partículas */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
          backgroundSize: "80px 80px",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.18) 70%, transparent 86%)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 38%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.18) 70%, transparent 86%)",
        }}
      />

      {/* Overlay suave para mezclar ambos efectos y evitar corte limpio */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(10,10,10,0.18) 48%, rgba(10,10,10,0.08) 62%, transparent 78%)",
        }}
      />

      {/* Contenido principal - centrado verticalmente */}
      <div className="max-w-container-max mx-auto relative z-10 px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
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
              className="text-center py-6 md:py-0"
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

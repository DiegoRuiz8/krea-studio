import { Suspense, lazy, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Stats from "./components/Stats";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { startSmoothScroll } from "./lib/motion";

const Layers = lazy(() => import("./components/Layers"));

function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <Suspense fallback={null}>
        <Layers />
      </Suspense>
      <main className="relative">
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;

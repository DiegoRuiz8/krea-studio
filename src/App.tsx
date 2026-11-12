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
import { WhatsAppButton } from "./components/WhatsAppButton";
import { startSmoothScroll } from "./lib/motion";

const Monolith = lazy(() => import("./components/Monolith"));

function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <Suspense fallback={null}>
        <Monolith />
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
      <WhatsAppButton />
    </MotionConfig>
  );
}

export default App;

import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import { DotField } from "./components/DotField";
import { Journey } from "./components/Journey";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Stats from "./components/Stats";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { startSmoothScroll } from "./lib/motion";

function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <DotField />
      <main className="relative">
        <Journey />
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

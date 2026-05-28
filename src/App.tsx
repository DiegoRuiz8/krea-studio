import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Process from "./components/Process";
import Portfolio from "./components/Portfolio";
import Stats from "./components/Stats";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <Portfolio />
        <Process />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

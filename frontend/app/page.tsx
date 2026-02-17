import RotatingShape from "./components/RotatingShape";
import DynamicBackground from "./components/DynamicBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Chains from "./components/Chains";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <div className="relative">
      <CustomCursor />
      <DynamicBackground />
      <RotatingShape />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <HowItWorks />
        <Chains />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

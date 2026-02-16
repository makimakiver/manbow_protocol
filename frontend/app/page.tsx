import RotatingShape from "./components/RotatingShape";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Chains from "./components/Chains";
import Stats from "./components/Stats";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="relative">
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

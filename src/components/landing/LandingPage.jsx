import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onLogin={onLogin} />

      <main>
        <Hero onLogin={onLogin} />
        <Features />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;

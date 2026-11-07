import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import AllProjects from "./components/AllProjects";
import ProjectModal from "./components/ProjectModal";
import Experience from "./components/Experience";
import Services from "./components/Services";
import Process from "./components/Process";
import GitHub from "./components/GitHub";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import AnimatedBackground from "./components/AnimatedBackground";
import { scrollToSection } from "./lib/scrollToSection";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Deep links (/#about, refreshed mid-page, shared links) land on the heading
  // with the same offset the navbar uses instead of under the floating pill.
  useEffect(() => {
    if (!window.location.hash) return;
    const go = () => scrollToSection(window.location.hash, { instant: true });
    go();
    const timer = setTimeout(go, 300);
    document.fonts?.ready.then(go).catch(() => {});
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-cream antialiased">
      <div className="noise" aria-hidden="true" />
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-[2]">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects onOpenProject={setSelectedProject} />
        <AllProjects onOpenProject={setSelectedProject} />
        <Experience />
        <Services />
        <Process />
        <GitHub />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

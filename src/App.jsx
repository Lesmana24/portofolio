import React from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-orange-500 selection:text-white">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

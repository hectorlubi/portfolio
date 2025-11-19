import React, { useState } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import PixelTrail from '../components/PixelTrail';

// ========================================
// HomePage.jsx
// ========================================
// Main portfolio page containing all sections:
// Hero, About, Skills, Projects, Contact
// Includes PixelTrail background effect
// ========================================
const HomePage = ({ theme, toggleTheme }) => {
  // current slide state for projects carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <>
      {/* PixelTrail background effect */}
      <div className="pixel-trail-container">
        <PixelTrail
          gridSize={100}
          trailSize={0.1}
          maxAge={999}
          interpolate={0.1}
          color={theme === 'dark' ? '#6acbff' : '#3396D3'}
          gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
        />
      </div>

      {/* Theme toggle switch */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Main page sections */}
      <Hero />
      <About />
      <Skills />
      <Projects currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
      <Contact />
    </>
  );
};

export default HomePage;
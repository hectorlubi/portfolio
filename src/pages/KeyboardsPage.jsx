import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import KeyboardHero from '../components/keyboards/KeyboardHero';
import KeyboardGallery from '../components/keyboards/KeyboardGallery';
import PixelTrail from '../components/PixelTrail';

// ========================================
// KeyboardsPage.jsx
// ========================================
// Main page for keyboard builds showcase
// Features:
// - Hero section with rhythm game
// - Gallery of keyboard builds with sound tests
// - Back navigation to portfolio
// ========================================

const KeyboardsPage = ({ theme, toggleTheme }) => {
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
          gooeyFilter={{ id: "keyboard-goo-filter", strength: 2 }}
        />
      </div>

      {/* Theme toggle switch */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

      {/* Back to Portfolio Button */}
      <motion.div
        className="back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <motion.button
            className="nav-back-btn"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </motion.button>
        </Link>
      </motion.div>

      {/* Main keyboard sections */}
      <KeyboardHero theme={theme} />
      <KeyboardGallery theme={theme} />
    </>
  );
};

export default KeyboardsPage;
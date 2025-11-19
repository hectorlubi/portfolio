import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RhythmGame from './RhythmGame';

// ========================================
// KeyboardHero.jsx
// ========================================
// Hero section for keyboards page featuring
// an interactive rhythm game using QWERTY keys
// ========================================

const KeyboardHero = ({ theme }) => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <section className="keyboard-hero">
      <div className="container">
        {!gameStarted ? (
          // Welcome screen before game starts
          <motion.div
            className="keyboard-hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="keyboard-hero-title">Keyboard Builds</h1>
            <p className="keyboard-hero-subtitle">
              Test your rhythm skills on the QWERTY keys
            </p>
            
            <motion.button
              className="start-game-btn"
              onClick={() => setGameStarted(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Start Rhythm Game
            </motion.button>

            <div className="game-instructions">
              <h3>How to Play:</h3>
              <ul>
                <li>Press the highlighted keys when the ring shrinks to match the circle</li>
                <li>Perfect timing = more points!</li>
                <li>Use all 26 QWERTY keys (A-Z)</li>
              </ul>
            </div>
          </motion.div>
        ) : (
          // Rhythm game component
          <RhythmGame 
            onExit={() => setGameStarted(false)}
            theme={theme}
          />
        )}
      </div>
    </section>
  );
};

export default KeyboardHero;
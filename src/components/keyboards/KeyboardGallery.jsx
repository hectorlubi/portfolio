import React from 'react';
import { motion } from 'framer-motion';
import KeyboardCard from './KeyboardCard';
import { keyboardBuilds } from '../../data/keyboardBuilds';
import ScrollReveal from '../ScrollReveal';

// ========================================
// KeyboardGallery.jsx
// ========================================
// Displays a grid of keyboard build cards
// Each card shows an image, description, and plays a sound test
// ========================================

const KeyboardGallery = ({ theme }) => {
  return (
    <section className="keyboard-gallery" id="gallery">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">My Keyboard Builds</h2>
          <p className="gallery-subtitle">
            Hover keyboard to hear its sound test
          </p>
        </ScrollReveal>

        <div className="keyboard-grid">
          {keyboardBuilds.map((keyboard, index) => (
            <ScrollReveal key={keyboard.id} delay={index * 0.1}>
              <KeyboardCard 
                keyboard={keyboard} 
                theme={theme}
                index={index}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyboardGallery;
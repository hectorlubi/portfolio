import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

// ========================================
// KeyboardCard.jsx
// ========================================
// Individual keyboard build card component
// Features:
// - Keyboard image
// - Sound test playback on click
// - Build specifications and description
// - Animated hover effects
// ========================================

  const KeyboardCard = ({ keyboard, theme, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);

  // ========================================
  // Initialize audio
  // ========================================
  React.useEffect(() => {
    audioRef.current = new Audio(keyboard.soundTest);
    audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    audioRef.current.addEventListener('canplaythrough', () => setAudioLoaded(true));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [keyboard.soundTest]);

  // ========================================
  // Toggle sound playback
  // ========================================
  const toggleSound = (e) => {
    e.stopPropagation();
    
    if (!audioLoaded) return;

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <motion.div
      className="keyboard-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}
    >
      {/* Keyboard Image */}
      <div className="keyboard-card-image" onClick={toggleSound}>
        
        <img src={keyboard.image} alt={keyboard.name} />

        {/* Sound control overlay */}
        <motion.div
          className="sound-overlay"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="sound-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSound}
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </motion.button>
        </motion.div>

        {/* Playing indicator */}
        {isPlaying && (
          <motion.div
            className="playing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Volume2 size={20} />
            <span>Playing...</span>
          </motion.div>
        )}
      </div>

      {/* Keyboard Info */}
      <div className="keyboard-card-content">
        <h3 className="keyboard-name">{keyboard.name}</h3>
        
        <div className="keyboard-specs">
          <div className="spec-item">
            <span className="spec-label">Switch:</span>
            <span className="spec-value">{keyboard.switch}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Keycaps:</span>
            <span className="spec-value">{keyboard.keycaps}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Plate:</span>
            <span className="spec-value">{keyboard.plate}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Layout:</span>
            <span className="spec-value">{keyboard.layout}</span>
          </div>
        </div>

        <p className="keyboard-description">{keyboard.description}</p>

        {/* Tags */}
        <div className="keyboard-tags">
          {keyboard.tags.map((tag, i) => (
            <motion.span
              key={i}
              className="tag"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KeyboardCard;
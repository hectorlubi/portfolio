
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ========================================
// KeyCircle.jsx
// ========================================
// Visual representation of a single key in the rhythm game
// Shows shrinking ring animation that syncs with beat timing
// All keys are visible, but only active ones have animated rings
// Visual feedback when key is pressed
// ========================================

const KeyCircle = ({ beatKey, targetTime, currentTime, theme, isActive }) => {
  const [isPressed, setIsPressed] = useState(false);
  // Calculate time until beat should be hit (only if active)
  const timeUntilBeat = isActive && targetTime ? targetTime - currentTime : null;
  
  // Approach window (how many seconds before beat the ring appears)
  const approachTime = 1.5;
  
  // Calculate ring scale (1 = full size, 0 = key size)
  const progress = timeUntilBeat !== null 
    ? Math.max(0, Math.min(1, 1 - (timeUntilBeat / approachTime)))
    : 0;
  
  // Ring animation scale
  const ringScale = 1 + (1 - progress) * 2; // Starts at 3x size, shrinks to 1x

  // Listen for key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === beatKey) {
        setIsPressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === beatKey) {
        setIsPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [beatKey]);

  // QWERTY keyboard layout positions (chuuni-keys inspired layout)
  const keyPositions = {
    // Top row
    q: { x: '8%', y: '25%' }, w: { x: '16%', y: '25%' }, e: { x: '24%', y: '25%' }, 
    r: { x: '32%', y: '25%' }, t: { x: '40%', y: '25%' }, y: { x: '60%', y: '25%' }, 
    u: { x: '68%', y: '25%' }, i: { x: '76%', y: '25%' }, o: { x: '84%', y: '25%' }, 
    p: { x: '92%', y: '25%' },
    
    // Middle row (home row)
    a: { x: '12%', y: '50%' }, s: { x: '20%', y: '50%' }, d: { x: '28%', y: '50%' }, 
    f: { x: '36%', y: '50%' }, g: { x: '44%', y: '50%' }, h: { x: '56%', y: '50%' }, 
    j: { x: '64%', y: '50%' }, k: { x: '72%', y: '50%' }, l: { x: '80%', y: '50%' },
    
    // Bottom row
    z: { x: '20%', y: '75%' }, x: { x: '28%', y: '75%' }, c: { x: '36%', y: '75%' }, 
    v: { x: '44%', y: '75%' }, b: { x: '56%', y: '75%' }, n: { x: '64%', y: '75%' }, 
    m: { x: '72%', y: '75%' }
  };

  const position = keyPositions[beatKey] || { x: '50%', y: '50%' };

  return (
    <motion.div
      className="key-circle-wrapper"
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: isPressed ? 0.9 : 1 // Shrink when pressed
      }}
      transition={{ duration: 0.1 }}
    >
      {/* Base key circle - bigger size */}
      <motion.div 
        className="key-circle"
        animate={{
          background: isPressed 
            ? (theme === 'dark' ? '#6acbff' : '#3396D3')
            : 'rgba(255, 255, 255, 0.2)'
        }}
        transition={{ duration: 0.1 }}
      >
        <span className="key-letter">{beatKey.toUpperCase()}</span>
      </motion.div>

      {/* Shrinking approach ring - only show when active */}
      {isActive && timeUntilBeat !== null && timeUntilBeat > -0.2 && (
        <motion.div
          className="approach-ring"
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '5%',
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            border: `4px solid ${theme === 'dark' ? '#6acbff' : '#3396D3'}`,
            pointerEvents: 'none'
          }}
          animate={{
            scale: ringScale,
            opacity: progress > 0.9 ? 0 : 1
          }}
          transition={{
            duration: 0.016,
            ease: 'linear'
          }}
        />
      )}

      {/* Glow effect when close to perfect timing */}
      {isActive && progress > 0.7 && progress < 1.1 && (
        <motion.div
          className="perfect-glow"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: theme === 'dark' ? '#6acbff' : '#3396D3',
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: -1
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity
          }}
        />
      )}
    </motion.div>
  );
};

export default KeyCircle;
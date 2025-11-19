import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import KeyCircle from './KeyCircle';
import GameUI from './GameUI';
import { beatmap } from '../../data/beatmap';

// ========================================
// RhythmGame.jsx
// ========================================
// Core rhythm game engine
// Handles timing, input detection, scoring
// ========================================

const RhythmGame = ({ onExit, theme }) => {
  // Audio reference
  const audioRef = useRef(null);
  
  // Game state
  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, ended
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [volume, setVolume] = useState(30); // Volume as percentage (0-100)
  
  // Active beats (currently on screen)
  const [activeBeats, setActiveBeats] = useState([]);
  
  // Feedback for hit/miss
  const [feedback, setFeedback] = useState(null);

  // Timing windows (in seconds)
  const PERFECT_WINDOW = 0.05;
  const GOOD_WINDOW = 0.1;
  const HIT_WINDOW = 0.15;

  // ========================================
  // Initialize game
  // ========================================
  useEffect(() => {
    audioRef.current = new Audio('/assets/audio/friend-song.mp3');
    audioRef.current.volume = 0.3;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ========================================
  // Update audio volume when slider changes
  // ========================================
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // ========================================
  // Game loop - update current time
  // ========================================
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [gameState]);

  // ========================================
  // Update active beats based on current time
  // ========================================
  useEffect(() => {
    if (gameState !== 'playing') return;

    const lookAhead = 2; // seconds to look ahead
    const active = beatmap.filter(beat => 
      beat.time > currentTime - 0.2 && // Show slightly before
      beat.time < currentTime + lookAhead &&
      !beat.hit
    );

    setActiveBeats(active);

    // Check for missed beats
    beatmap.forEach(beat => {
      if (!beat.hit && beat.time < currentTime - HIT_WINDOW) {
        beat.hit = true;
        handleMiss();
      }
    });
  }, [currentTime, gameState]);

  // ========================================
  // Handle key press
  // ========================================
  useEffect(() => {
    if (gameState !== 'playing') return;

    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase();
      if (!/^[a-z]$/.test(key)) return; // Only accept a-z

      // Find the closest upcoming beat for this key
      const beat = beatmap.find(b => 
        b.key === key && 
        !b.hit && 
        Math.abs(b.time - currentTime) < HIT_WINDOW
      );

      if (beat) {
        const timeDiff = Math.abs(beat.time - currentTime);
        beat.hit = true;

        if (timeDiff < PERFECT_WINDOW) {
          handleHit('perfect', 100);
        } else if (timeDiff < GOOD_WINDOW) {
          handleHit('good', 50);
        } else {
          handleHit('ok', 25);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, currentTime]);

  // ========================================
  // Handle successful hit
  // ========================================
  const handleHit = (quality, points) => {
    setScore(prev => prev + points);
    setCombo(prev => {
      const newCombo = prev + 1;
      setMaxCombo(m => Math.max(m, newCombo));
      return newCombo;
    });
    
    setFeedback({ type: quality, timestamp: Date.now() });
    setTimeout(() => setFeedback(null), 500);
  };

  // ========================================
  // Handle miss
  // ========================================
  const handleMiss = () => {
    setCombo(0);
    setFeedback({ type: 'miss', timestamp: Date.now() });
    setTimeout(() => setFeedback(null), 500);
  };

  // ========================================
  // Game controls
  // ========================================
  const startGame = () => {
    setGameState('playing');
    audioRef.current.play();
  };

  const pauseGame = () => {
    setGameState('paused');
    audioRef.current.pause();
  };

  const resumeGame = () => {
    setGameState('playing');
    audioRef.current.play();
  };

  const exitGame = () => {
    setGameState('ended');
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    onExit();
  };

  // ========================================
  // Render
  // ========================================
  return (
    <div className="rhythm-game">
      {/* Game UI - Score, Combo, Progress */}
      <GameUI
        score={score}
        combo={combo}
        maxCombo={maxCombo}
        currentTime={currentTime}
        duration={audioRef.current?.duration || 0}
        gameState={gameState}
        feedback={feedback}
        onPause={pauseGame}
        onResume={resumeGame}
        onExit={exitGame}
        volume={volume}
        onVolumeChange={setVolume}
      />

      {/* Game board - Key circles */}
      <div className="game-board">
        {gameState === 'ready' && (
          <motion.button
            className="start-btn"
            onClick={startGame}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Start
          </motion.button>
        )}

        {gameState === 'playing' && (
          <div className="key-circles-container">
            {/* Show all 26 keys statically */}
            {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
              'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
              'z', 'x', 'c', 'v', 'b', 'n', 'm'].map(key => {
                // Check if this key has an active beat
                const activeBeat = activeBeats.find(beat => beat.key === key);
                
                return (
                  <KeyCircle
                    key={key}
                    beatKey={key}
                    targetTime={activeBeat ? activeBeat.time : null}
                    currentTime={currentTime}
                    theme={theme}
                    isActive={!!activeBeat}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RhythmGame;
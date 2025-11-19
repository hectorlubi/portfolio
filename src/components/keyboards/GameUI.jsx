
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, X, Volume2 } from 'lucide-react';

// ========================================
// GameUI.jsx
// ========================================
// Displays game state information:
// - Score and combo counter
// - Progress bar synced to song
// - Hit feedback (Perfect/Good/Miss)
// - Control buttons (pause, resume, exit)
// ========================================

const GameUI = ({
  score,
  combo,
  maxCombo,
  currentTime,
  duration,
  gameState,
  feedback,
  onPause,
  onResume,
  onExit,
  volume,
  onVolumeChange
}) => {
  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-ui">
      {/* Top bar - Score and Combo */}
      <div className="game-stats">
        <motion.div 
          className="score-display"
          key={score}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-label">Score</span>
          <span className="stat-value">{score.toLocaleString()}</span>
        </motion.div>

        <motion.div 
          className="combo-display"
          animate={{ 
            scale: combo > 0 ? [1, 1.15, 1] : 1,
            opacity: combo > 0 ? 1 : 0.5 
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="stat-label">Combo</span>
          <span className="stat-value combo-value">
            {combo > 0 ? `${combo}x` : '0x'}
          </span>
          {combo > 10 && (
            <motion.span 
              className="combo-fire"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              🔥
            </motion.span>
          )}
        </motion.div>

        <div className="max-combo-display">
          <span className="stat-label">Max Combo</span>
          <span className="stat-value">{maxCombo}x</span>
        </div>
      </div>

      {/* Feedback overlay (Perfect/Good/Miss) */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`feedback-overlay feedback-${feedback.type}`}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1.5, opacity: 1, y: 0 }}
            exit={{ scale: 2, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {feedback.type === 'perfect' && 'PERFECT!'}
            {feedback.type === 'good' && 'GOOD'}
            {feedback.type === 'ok' && '○ OK.'}
            {feedback.type === 'miss' && '✗ MISS!'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        <div className="progress-bar-track">
          <motion.div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>

      {/* Control buttons */}
      <div className="game-controls">
        {/* Volume Control */}
        <div className="volume-control">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="volume-slider"
          />
          <span className="volume-label">{Math.round(volume)}%</span>
        </div>
        
        {gameState === 'playing' && (
          <motion.button
            className="control-btn"
            onClick={onPause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Pause"
          >
            <Pause size={24} />
          </motion.button>
        )}

        {gameState === 'paused' && (
          <motion.button
            className="control-btn"
            onClick={onResume}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Resume"
          >
            <Play size={24} />
          </motion.button>
        )}

        <motion.button
          className="control-btn exit-btn"
          onClick={onExit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Exit"
        >
          <X size={24} />
        </motion.button>
      </div>

      {/* Paused overlay */}
      {gameState === 'paused' && (
        <motion.div
          className="paused-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2>PAUSED</h2>
          <p>Click the play button or press ESC to exit</p>
          <div className="paused-controls">
            <motion.button
              className="paused-btn resume-btn"
              onClick={onResume}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Resume Game
            </motion.button>
            <motion.button
              className="paused-btn exit-paused-btn"
              onClick={onExit}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Exit to Menu
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GameUI;
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

// ========================================
// ThemeToggle.jsx
// ========================================
// A theme switcher component that toggles between light and dark modes.
//
// Features:
// - Animated toggle slider using Framer Motion.
// - Smooth spring transitions on click and hover.
// - Uses Lucide icons (Sun & Moon) for visual theme indicators.
// ========================================
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <motion.div 
      className="theme-toggle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Toggle switch container */}
      <div className="toggle-switch" onClick={toggleTheme}>
        <motion.div 
          className="toggle-slider"
          animate={{
            x: theme === 'dark' ? 30 : 0
          }}
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        >
          {/* Icon changes dynamically based on theme */}
          {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ThemeToggle;
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KeyboardsPage from './pages/KeyboardsPage';
import './App.css';
import './keyboards.css';

// ========================================
// App.jsx
// ========================================
// Main entry point of the portfolio application.
// Responsible for:
// - Rendering all main sections (Hero, About, Skills, Projects, Contact).
// - Managing global theme state (light/dark).
// - Managing carousel state for Projects section.
// - Integrating PixelTrail animated background effect.
// ========================================
const App = () => {

  // theme state
  const [theme, setTheme] = useState('light');

  // toggle between light/dark
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // ========================================
  // Component Render
  // ========================================
   return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/keyboards" element={<KeyboardsPage theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Twitch, Github, Linkedin, Instagram } from 'lucide-react';
import { Sampled3DTexture } from 'three/src/renderers/common/SampledTexture.js';

// ========================================
// Hero.jsx
// ========================================
// Displays the landing section of the portfolio site.
// Features include a typewriter text effect, profile image,
// animated buttons, and social media links.
// Framer Motion is used for smooth entrance and hover animations.
// ========================================

const Hero = () => {

  // state for typewriter text animation
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // array of phrases to cycle through in the typewriter effect
  const phrases = [
    "Full-Stack Developer.",
    "Game Designer.",
    "Problem Solver.",
    "Gamer.",
    "Content Creator."
  ];

  // ========================================
  // Typewriter Effect Logic
  // ========================================
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (isDeleting) {

      // if currently deleting characters
      if (text.length === 0) {

        // once deletion is complete, move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        timeout = setTimeout(() => {}, 500);
      } else {

        // continue deleting one character at a time
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length - 1));
        }, 50);
      }
    } else {

      // typing phase
      if (text.length === currentPhrase.length) {

        // pause before starting deletion
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      } else {

        // add one character at a time
        timeout = setTimeout(() => {
          setText(currentPhrase.substring(0, text.length + 1));
        }, 100);
      }
    }

    // clean up
    return () => clearTimeout(timeout);
  }, [text, phraseIndex, isDeleting]);

  // ========================================
  // Social Media Links
  // ========================================
  const socialLinks = [
    { href: "https://youtube.com/@platapus9", icon: <Youtube size={24} />, title: "YouTube" },
    { href: "https://twitch.tv/platapuss", icon: <Twitch />, title: "Twitch" },
    { href: "https://linkedin.com/in/hector-lubi", icon: <Linkedin size={24} />, title: "LinkedIn" },
    { href: "https://github.com/hectorlubi", icon: <Github size={24} />, title: "GitHub" },
    { href: "https://instagram.com/hector_lubi", icon: <Instagram size={24} />, title: "Instagram" }
  ];

  // ========================================
  // Component Render
  // ========================================
  return (
    <header className="hero" id="home">
      <div className="hero-content">

        {/* Left Section — Intro Text & Buttons */}
        <motion.div 
          className="hero-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Name Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hello, My name is Hector Lubi
          </motion.h1>
          
          {/* Typewriter Animated Text */}
          <motion.div 
            className="typewriter-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="typewriter">
              I am a <span className="typewriter-text">{text}</span>
            </div>
          </motion.div>

          {/* Call-to-Action Buttons */}
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {/* View Projects Button */}
            <motion.a 
              href="#projects" 
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Projects
            </motion.a>

            {/* Resume Download Button */}
            <motion.a 
              href="resume.pdf" 
              download 
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Resume
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Right Section — Profile Image & Social Links */}
        <motion.div 
          className="hero-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          {/* Profile Image with Hover Animation */}
          <motion.div 
            className="profile-image"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.2 }}
          >
            <img src="assets/images/profile.png" alt="Profile"/>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div 
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title={social.title}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Hero;

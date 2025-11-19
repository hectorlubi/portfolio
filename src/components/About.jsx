import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { Link } from 'react-router-dom';

// ========================================
// About.jsx
// ========================================
// This component displays the "About Me" section of the portfolio.
// It includes a hoverable keyboard image, motion effects using Framer Motion,
// and smooth reveal animations via a custom ScrollReveal component.
// ========================================

const About = () => {
    
    // tracks if keyboard image is being hovered
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="about" id="about">
            <div className="container">
                {/* Section Title with Scroll Reveal Animation */}
                <ScrollReveal>
                    <h2 className="section-title">About Me</h2>
                </ScrollReveal>

                {/* Main About Content */}
                <ScrollReveal delay={0.2}>
                    <div className="about-card">

                        {/* Hover Keyboard Image */}
                        <motion.div 
                            className="keyboard-image keyboard-image-hover-container"
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            >
                            {/* Overlay that fades in when hovered */}
                            <motion.div
                                className="hover-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Hover Button inside overlay */}
                                <Link to="/keyboards" className="hover-button">
                                    <motion.span
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Keyboards!
                                    </motion.span>
                                </Link>
                            </motion.div>

                            {/* Keyboard Image */}
                            <div className="keyboard-image">
                                <img src="assets/images/keyboard.png" alt="Keyboard"/>
                            </div>
                        </motion.div>

                        {/* About Text Section */}
                        <div className="about-text">
                            <h3>Hi, I'm Hector</h3>
                            <p>
                                I love figuring out what makes people want to play the same game over and over again or
                                the tiny design choices that make a game feel satisfying or a system feel just right.
                                My goal is to design those kinds of experiences myself. Games that feel good to play 
                                and keep players coming back for "one more game".
                            </p>
                            <p>
                                If I'm not climbing the TFT ladder, watching anime, or reading comics,
                                I'm probably coding something weird, swapping keyboard switches,
                                or getting a good lift in.
                            </p>

                            {/* Buttons for Navigation */}
                            <div className="about-buttons">
                                <motion.a 
                                href="#projects" 
                                className="btn btn-primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                >
                                View Projects
                                </motion.a>

                                {/* Contact Me Button */}
                                <motion.a 
                                href="#contact" 
                                className="btn btn-secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                >
                                Contact Me
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default About;
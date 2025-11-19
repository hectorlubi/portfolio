import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ========================================
// ScrollReveal.jsx
// ========================================
// A reusable component that animates its children 
// into view as the user scrolls down the page.
//
// Features:
// - Uses Framer Motion for entrance animation.
// - Fades and slides elements upward when they enter the viewport.
// - Optional delay prop for staggered reveal effects.
// ========================================
const ScrollReveal = ({ children, delay = 0 }) => {

  // reference to the DOM element being observed
  const ref = useRef(null);

  // tracks whether the element is visible in the viewport
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // ========================================
  // Component Render
  // ========================================
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // start hidden 
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // animate when in view 
      transition={{ duration: 0.6, delay }} // optional staggered delay
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
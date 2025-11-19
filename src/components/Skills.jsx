import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ========================================
// Skills.jsx
// ========================================
// Displays a list of technologies and tools with animated
// progress bars to visually represent proficiency levels.
//
// Features:
// - Animated skill bars that fill when scrolled into view.
// - Uses Framer Motion for smooth transitions and shine effects.
// - Reuses ScrollReveal for section entrance animations.
// ========================================

// ========================================
// SkillBar Component
// ========================================
// Renders individual skill bars with animated filling, 
// shining effect, and category labels.
// ========================================
const SkillBar = ({ skill, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref}
      className="skill-item"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >

      {/* Skill name and level */}
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-level">{skill.level}%</span>
      </div>

      {/* HP-style bar container */}
      <div className="hp-bar-container">
        <motion.div 
          className="hp-bar-fill"
          style={{ 
            background: `linear-gradient(90deg, ${skill.color} 0%, ${skill.color}dd 100%)`
          }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        >

          {/* Shine animation */}
          <motion.div 
            className="hp-bar-shine"
            animate={{ 
              x: ['-100%', '200%'],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Notches for visual segments */}
        <div className="hp-bar-notches">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="hp-notch" style={{ left: `${i * 10}%` }} />
          ))}
        </div>
      </div>

      {/* Skill category label */}
      <span className="skill-category">{skill.category}</span>
    </motion.div>
  );
};

// ========================================
// Skills Section
// ========================================
// Wraps all SkillBar components and section header.
// ========================================
const Skills = () => {
  const skills = [
    { name: "Unreal Engine 5", level: 90, color: "#3396D3" },
    { name: "Unity", level: 90, color: "#3396D3" },
    { name: "HTML/CSS", level: 95, color: "#3396D3" },
    { name: "Node.js", level: 70, color: "#3396D3" },
    { name: "Python", level: 90, color: "#3396D3" },
    { name: "Java", level: 90, color: "#3396D3" },
    { name: "JavaScript", level: 85, color: "#3396D3" },
    { name: "C/C++", level: 80, color: "#3396D3" },
    { name: "C#", level: 80, color: "#3396D3" },
    { name: "React", level: 85, color: "#3396D3" },
    { name: "MongoDB", level: 70, color: "#3396D3" }
  ];

  return (
    <section className="skills" id="skills">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Technologies & Tools</h2>
        </ScrollReveal>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
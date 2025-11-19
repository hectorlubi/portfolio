import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

// ========================================
// Projects.jsx
// ========================================
// Displays the projects section of the portfolio site.
// Features a responsive carousel layout that showcases
// multiple project cards, each with animations and hover effects.
// Framer Motion is used for smooth entrance, hover, and slide transitions.
// ========================================
const ProjectCard = ({ project, index }) => {

  // state for hover animation toggle
  const [isHovered, setIsHovered] = useState(false);

  // ========================================
  // Component Render
  // ========================================
  return (
    <motion.div 
      className="project-card project-card-hover-container" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="project-image">
       {project.image ? (
          <img src={project.image} alt={project.title}/>
       ) : (
        'A'
       )}
      </div>

      {/* Project Content */}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {/* Project Tags */}
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <motion.span 
              className="tag" 
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
      
      {/* Hover Overlay — Code Button */}
      {project.link && (
        <motion.div
          className="hover-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Code
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  );
};

// ========================================
// Projects Component
// ========================================
// Renders the projects section, including:
// - Scroll reveal animations for the section title
// - Carousel functionality for project slides
// - Navigation arrows and dot indicators
// ========================================
const Projects = ({ currentSlide, setCurrentSlide }) => {

  // array of project pages to display in the carousel
  const projectPages = [
    [
      { 
        title: 'ConnecTFTions', 
        description: 'A connections-style game for TFT players.', 
        tags: ['JavaScript', 'CSS', 'HTML', 'React'],
        link: 'https://github.com/hectorlubi/ConnecTFTions',
        image: './assets/images/connectftions.png'
      },
      { 
        title: 'KeyboardSurvivor', 
        description: 'Fast-paced typing/rogue-like game with augments', 
        tags: ['Unity', 'C#'],
        link: null,
        image: './assets/images/typinggame.png'
      },
      { 
        title: 'Trait Solver', 
        description: 'Inspired by Boardle. Complete as many boards as you can in the time allocated.', 
        tags: ['Unreal Engine 5', 'Blueprints', 'DataTables'],
        link: null
      }
    ],
    [
      { 
        title: '3D R.E.P.O Scene', 
        description: 'Final assignment for graphics class. Rendered using OpenGL.', 
        tags: ['C++'],
        image: './assets/images/repo.png'
      },
      { 
        title: 'Connect 4', 
        description: 'My version of Connect 4 features an AI opponent powered by the minimax algorithm', 
        tags: ['Java'],
        link: null,
        image: './assets/images/connect.png'
      },
      { 
        title: 'Message Board Web Application', 
        description: 'Multi-threaded API web sever', 
        tags: ['Python', 'JavaScript', 'HTML', 'CSS'],
        link: null,
        image: './assets/images/messageboard.png'
      }
    ]
  ];

  // ========================================
  // Carousel Navigation Logic
  // ========================================
  const moveCarousel = (direction) => {
    let newSlide = currentSlide + direction;
    if (newSlide < 0) newSlide = projectPages.length - 1;
    if (newSlide >= projectPages.length) newSlide = 0;
    setCurrentSlide(newSlide);
  };

  // ========================================
  // Component Render
  // ========================================
  return (
    <section className="projects" id="projects">
      <div className="container">

        {/* Section Title */}
        <ScrollReveal>
          <h2 className="section-title">Projects</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px', fontSize: '1.1rem' }}>
            My recent works
          </p>
        </ScrollReveal>
        
        {/* Carousel Container */}
        <div className="projects-carousel">

          {/* Carousel Navigation Arrows */}
          <motion.button 
            className="carousel-arrow left" 
            onClick={() => moveCarousel(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            ‹
          </motion.button>
          <motion.button 
            className="carousel-arrow right" 
            onClick={() => moveCarousel(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            ›
          </motion.button>
          
          {/* Carousel Slides */}
          <div className="projects-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {projectPages.map((page, pageIndex) => (
              <div className="project-slide" key={pageIndex}>
                {page.map((project, index) => (
                  <ProjectCard key={index} project={project} index={index} />
                ))}
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {projectPages.map((_, index) => (
              <motion.div
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
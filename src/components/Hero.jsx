import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/samples');
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-flex-container">
          {/* Text Content Section (Left) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Premium
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="highlight"
              >
                Design & Print
              </motion.span>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Solutions
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Transforming your ideas into stunning printed materials with CMYK perfection.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <button className="cta-button pulse" onClick={handleGetStarted}>Get Started</button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-logo"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={logo} 
              alt="Design N Print Logo" 
              className="logo-image"
            />
          </motion.div>
        </div>
      </div>
      
      <div className="hero-bg">
        <div className="cmyk-circle cyan"></div>
        <div className="cmyk-circle magenta"></div>
        <div className="cmyk-circle yellow"></div>
        <div className="cmyk-circle black"></div>
      </div>
    </section>
  );
};

export default Hero;
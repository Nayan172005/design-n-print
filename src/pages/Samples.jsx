import React from 'react';
import { motion } from 'framer-motion';
import SamplesGallery from '../components/SamplesGallery';

const Samples = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="samples-page"
    >
      <div className="container">
        <h1 className="page-title">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="highlight"
            >
            Our Work Samples
            </motion.span>
          </h1>
        <p className="page-subtitle">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
            Browse our collection of premium print designs
            </motion.p>
          </p>
        <div className="samples-content">
          <SamplesGallery expandedView={true} />
        </div>
      </div>
    </motion.main>
  );
};

export default Samples;
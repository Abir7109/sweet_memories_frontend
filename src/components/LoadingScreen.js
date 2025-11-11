import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingScreen.css';

function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="loading-container">
        {/* Rose Image Container */}
        <div className="rose-container">
          {/* Spinning Loading Circle */}
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="spinner-circle"></div>
          </motion.div>

          {/* Rose Image */}
          <img
            src="/rose.svg"
            alt="Loading"
            className="rose-image"
          />
        </div>

        <motion.p
          className="loading-text"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading...
        </motion.p>
      </div>

      <div className="loading-background"></div>
    </motion.div>
  );
}

export default LoadingScreen;

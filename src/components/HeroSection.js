import React from 'react';
import { motion } from 'framer-motion';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <img 
          src="/couple-hero.jpg" 
          alt="Couple" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h1
          className="hero-title"
          animate={{ textShadow: ['0 0 10px rgba(230, 95, 118, 0.5)', '0 0 20px rgba(230, 95, 118, 0.8)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Abir & MoonMoon
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Sweet Memories - Celebrate your love story, one memory at a time
        </motion.p>

        <motion.button
          className="hero-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Start Exploring ↓
        </motion.button>
      </motion.div>

      {/* Floating hearts animation */}
      <div className="floating-hearts">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            animate={{
              y: [0, -300],
              opacity: [1, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            style={{
              left: `${20 + i * 15}%`,
              delay: i * 0.2,
            }}
          >
            <img src="/love.gif" alt="Love" className="floating-love-gif" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;

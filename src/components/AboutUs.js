import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <section className="about-us" id="about">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Our Story
        </motion.h2>

        <div className="about-content">
          {/* Left Side - Image */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src="/love-story.jpg"
              alt="Couple"
            />
            <div className="image-frame"></div>
          </motion.div>

          {/* Right Side - Story */}
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Abir & MoonMoon's Love Story</h3>
            <p>
              Every love story is unique and beautiful in its own way. This is a celebration of moments Abir and MoonMoon have shared,
              memories they've created, and the journey they continue to take together. A love that grows stronger with every memory made.
            </p>

            <div className="story-highlights">
              <motion.div
                className="highlight-item"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="highlight-icon">💕</span>
                <div>
                  <h4>How We Met</h4>
                  <p>That was a sudden situation, we just fell in love for each other, fate connected us.</p>
                </div>
              </motion.div>

              <motion.div
                className="highlight-item"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="highlight-icon">🌸</span>
                <div>
                  <h4>Our Beginnings</h4>
                  <p>It all started in June 2025, a month of love and discovery.</p>
                </div>
              </motion.div>

              <motion.div
                className="highlight-item"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="highlight-icon">🎯</span>
                <div>
                  <h4>Our Milestones</h4>
                  <p>A journey filled with laughter, dreams, and countless happy memories.</p>
                </div>
              </motion.div>

              <motion.div
                className="highlight-item"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="highlight-icon">✨</span>
                <div>
                  <h4>Forever Together</h4>
                  <p>A commitment to cherish every moment with Abir & MoonMoon.</p>
                </div>
              </motion.div>
            </div>

            <p className="closing-text">
              Thank you for being part of our journey and witnessing our beautiful love story.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;

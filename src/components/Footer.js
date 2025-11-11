import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Floating hearts background */}
      <div className="footer-hearts-bg">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 30 - 15],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${10 + i * 12}%`,
            }}
          >
            {['♥', '💖', '💕', '💗'][i % 4]}
          </motion.div>
        ))}
      </div>

      <div className="footer-container">
        {/* Main content */}
        <div className="footer-main">
          <motion.div
            className="footer-logo"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="logo-hearts"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💞
            </motion.div>
            <h2>Sweet Memories</h2>
            <p className="footer-subtitle">🌸 Abir & MoonMoon 🌸</p>
          </motion.div>

          {/* Quick links with cute styling */}
          <div className="footer-links">
            <motion.a
              href="#home"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🏠 Home
            </motion.a>
            <motion.a
              href="#gallery"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🖼️ Gallery
            </motion.a>
            <motion.a
              href="#timeline"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ⏰ Timeline
            </motion.a>
            <motion.a
              href="#love-notes"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              💌 Love Notes
            </motion.a>
          </div>
        </div>

        {/* Cute divider */}
        <div className="footer-divider">
          <span>🌟</span>
          <span>💖</span>
          <span>🌟</span>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <motion.div
            className="footer-message"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="love-quote">
              “Every love story is beautiful, but ours is my favorite” 🌹
            </p>
            <p className="footer-copyright">
              © {currentYear} Abir & MoonMoon • Made with <motion.span
                className="heart-pulse"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >💖</motion.span> & endless love
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

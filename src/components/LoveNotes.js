import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/LoveNotes.css';

function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(0);

  const notes = [
    {
      id: 1,
      author: 'Abir',
      message: 'Every moment with you MoonMoon is a treasure I hold close to my heart. You make my world complete.',
      emoji: '💌',
    },
    {
      id: 2,
      author: 'MoonMoon',
      message: 'You are my greatest adventure Abir, and my favorite place to call home. Forever and always, you and me.',
      emoji: '💝',
    },
    {
      id: 3,
      author: 'Abir',
      message: 'In your eyes MoonMoon, I found my home. In your heart, I found my love. In your arms, I found myself.',
      emoji: '💕',
    },
    {
      id: 4,
      author: 'MoonMoon',
      message: 'Thank you Abir for being my rock, my light, and my everything. I love you more with each passing day.',
      emoji: '💖',
    },
  ];

  const nextNote = () => {
    setCurrentNote((prev) => (prev + 1) % notes.length);
  };

  const prevNote = () => {
    setCurrentNote((prev) => (prev - 1 + notes.length) % notes.length);
  };

  return (
    <section className="love-notes" id="love-notes">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Love Notes
        </motion.h2>

        <div className="notes-carousel">
          <motion.button
            className="carousel-btn prev"
            onClick={prevNote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ← 
          </motion.button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentNote}
              className="note-card"
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
            >
              <div className="note-emoji">{notes[currentNote].emoji}</div>
              <p className="note-message">{notes[currentNote].message}</p>
              <p className="note-author">— {notes[currentNote].author}</p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            className="carousel-btn next"
            onClick={nextNote}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            →
          </motion.button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {notes.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${currentNote === index ? 'active' : ''}`}
              onClick={() => setCurrentNote(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                backgroundColor: currentNote === index ? 'var(--primary-pink)' : 'rgba(230, 95, 118, 0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LoveNotes;

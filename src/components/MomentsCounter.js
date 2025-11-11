import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/MomentsCounter.css';

function MomentsCounter() {
  const [counters, setCounters] = useState({
    days: 0,
    memories: 0,
    photos: 0,
    laughs: 0,
  });

  useEffect(() => {
    // Calculate days together from when Abir & MoonMoon met
    const startDate = new Date('2025-06-01');
    const today = new Date();
    const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

    setCounters({
      days: daysTogether,
      memories: 47,
      photos: 203,
      laughs: 1000,
    });
  }, []);

  const stats = [
    {
      number: counters.days,
      label: 'Days Together',
      icon: '💕',
    },
    {
      number: counters.memories,
      label: 'Beautiful Memories',
      icon: '✨',
    },
    {
      number: counters.photos,
      label: 'Photos',
      icon: '📷',
    },
    {
      number: '+',
      sublabel: counters.laughs,
      label: 'Laughs & Smiles',
      icon: '😄',
    },
  ];

  return (
    <section className="moments-counter">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Abir & MoonMoon's Moments
        </motion.h2>

        <div className="counter-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="counter-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="counter-icon">{stat.icon}</div>
              <div className="counter-number">
                {stat.number}
                {stat.sublabel && <span className="sublabel">{stat.sublabel}</span>}
              </div>
              <p className="counter-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MomentsCounter;

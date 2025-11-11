import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Timeline.css';

function Timeline() {
  const milestones = [
    {
      id: 1,
      year: 'June 2025',
      title: 'How We Met',
      description: 'That was a sudden situation, we just fell in love for each other, fate connected us.',
      icon: '💕',
    },
    {
      id: 2,
      year: 'June 2025',
      title: 'Our Beginnings',
      description: 'A month of love and discovery. The start of an incredible journey together.',
      icon: '🌸',
    },
    {
      id: 3,
      year: 'Present',
      title: 'Our Milestones',
      description: 'A journey filled with laughter, dreams, and countless happy memories.',
      icon: '🎯',
    },
    {
      id: 4,
      year: 'Forever',
      title: 'Abir & MoonMoon',
      description: 'Building our beautiful love story, one precious moment at a time.',
      icon: '✨',
    },
    {
      id: 5,
      year: 'Always',
      title: 'Endless Love',
      description: 'Our love journey continues, filled with passion, laughter, and beautiful memories.',
      icon: '💋',
    },
  ];

  return (
    <section className="timeline" id="timeline">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Our Timeline
        </motion.h2>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="timeline-content">
                <motion.div
                  className="timeline-icon"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {milestone.icon}
                </motion.div>

                <motion.div
                  className="timeline-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="timeline-year">{milestone.year}</span>
                  <h3 className="timeline-title">{milestone.title}</h3>
                  <p className="timeline-description">{milestone.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

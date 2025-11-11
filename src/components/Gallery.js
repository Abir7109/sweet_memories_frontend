import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Gallery.css';

function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const tags = ['All', 'First Date', 'Travel', 'Festivals', 'Random Laughs'];

  const memories = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop',
      caption: 'Our First Meeting',
      date: '2020-05-15',
      tag: 'First Date',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      caption: 'Beach Day',
      date: '2021-07-20',
      tag: 'Travel',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400&h=400&fit=crop',
      caption: 'New Year Celebration',
      date: '2022-01-01',
      tag: 'Festivals',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
      caption: 'Silly Moments',
      date: '2022-06-10',
      tag: 'Random Laughs',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1502945401341-f314d32f7db5?w=400&h=400&fit=crop',
      caption: 'Mountain Adventure',
      date: '2022-09-05',
      tag: 'Travel',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=400&fit=crop',
      caption: 'Sunset Romance',
      date: '2023-02-14',
      tag: 'First Date',
    },
  ];

  const filteredMemories = activeFilter === 'All' 
    ? memories 
    : memories.filter(m => m.tag === activeFilter);

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Our Gallery
        </motion.h2>

        {/* Filter Tags */}
        <motion.div
          className="gallery-filters"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {tags.map((tag, index) => (
            <motion.button
              key={tag}
              className={`filter-tag ${activeFilter === tag ? 'active' : ''}`}
              onClick={() => setActiveFilter(tag)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
            >
              {tag === 'All' && '✨'} {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="memory-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="memory-image-wrapper">
                <img src={memory.image} alt={memory.caption} />
                <motion.div
                  className="memory-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="memory-caption">{memory.caption}</p>
                  <p className="memory-date">{new Date(memory.date).toLocaleDateString()}</p>
                </motion.div>
              </div>
              <div className="memory-badge">{memory.tag}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;

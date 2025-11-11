import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageUpload from './ImageUpload';
import Lightbox from './Lightbox';
import '../styles/AdvancedGallery.css';

function AdvancedGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [memories, setMemories] = useState([
    {
      id: 1,
      image: '/gallery/IMG-20251020-WA0006.jpg',
      caption: 'Our Beautiful Moment Together',
      date: '2025-10-20',
      tag: 'Random Laughs',
      rotation: 0,
    },
    {
      id: 2,
      image: '/gallery/IMG-20251020-WA0022.jpg',
      caption: 'Love Captured',
      date: '2025-10-20',
      tag: 'First Date',
      rotation: 0,
    },
    {
      id: 3,
      image: '/gallery/IMG-20251020-WA0048.jpg',
      caption: 'Precious Smile',
      date: '2025-10-20',
      tag: 'Random Laughs',
      rotation: 0,
    },
    {
      id: 4,
      image: '/gallery/IMG-20251020-WA0099.jpg',
      caption: 'Sweet Memories',
      date: '2025-10-20',
      tag: 'First Date',
      rotation: 0,
    },
    {
      id: 5,
      image: '/gallery/IMG-20251020-WA0120.jpg',
      caption: 'Forever in My Heart',
      date: '2025-10-20',
      tag: 'Adventures',
      rotation: 0,
    },
    {
      id: 6,
      image: '/gallery/IMG-20251020-WA0164.jpg',
      caption: 'Us Against the World',
      date: '2025-10-20',
      tag: 'Random Laughs',
      rotation: 0,
    },
    {
      id: 7,
      image: '/gallery/IMG-20251020-WA0211.jpg',
      caption: 'Perfect Day with You',
      date: '2025-10-20',
      tag: 'Adventures',
      rotation: 0,
    },
    {
      id: 8,
      image: '/gallery/IMG-20251020-WA0213.jpg',
      caption: 'Love in Every Frame',
      date: '2025-10-20',
      tag: 'First Date',
      rotation: 0,
    },
    {
      id: 9,
      image: '/gallery/IMG-20251020-WA0333.jpg',
      caption: 'Abir & MoonMoon Magic',
      date: '2025-10-20',
      tag: 'Random Laughs',
      rotation: 0,
    },
    {
      id: 10,
      image: '/gallery/IMG-20251020-WA0346.jpg',
      caption: 'Happiness Looks Good on Us',
      date: '2025-10-20',
      tag: 'Adventures',
      rotation: 0,
    },
    {
      id: 11,
      image: '/gallery/IMG-20251020-WA0365.jpg',
      caption: 'End of a Perfect Day',
      date: '2025-10-20',
      tag: 'First Date',
      rotation: 0,
    },
  ]);

  const tags = ['All', 'First Date', 'Travel', 'Festivals', 'Random Laughs'];

  // Load memories from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('galleryMemories');
    if (saved) {
      try {
        setMemories(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load memories:', e);
      }
    }
  }, []);

  // Save memories to localStorage
  useEffect(() => {
    localStorage.setItem('galleryMemories', JSON.stringify(memories));
  }, [memories]);

  const handleAddImage = (imageData) => {
    setMemories([imageData, ...memories]);
  };

  const handleDeleteImage = (id) => {
    setMemories(memories.filter((m) => m.id !== id));
  };

  const filteredMemories =
    activeFilter === 'All'
      ? memories
      : memories.filter((m) => m.tag === activeFilter);

  const handleLightboxOpen = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    const currentIndex = filteredMemories.findIndex((m) => m.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredMemories.length;
    setSelectedImage(filteredMemories[nextIndex]);
  };

  const handleLightboxPrev = () => {
    const currentIndex = filteredMemories.findIndex((m) => m.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredMemories.length) % filteredMemories.length;
    setSelectedImage(filteredMemories[prevIndex]);
  };

  return (
    <section className="advanced-gallery" id="gallery">
      <div className="container">
        {/* Section Title */}
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Gallery</h2>
          <p>Add and share your beautiful memories together</p>
        </motion.div>

        {/* Image Upload Section */}
        <ImageUpload onImageAdd={handleAddImage} />

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

        {/* Memory Count */}
        <motion.div
          className="memory-count"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {filteredMemories.length} memory/memories
        </motion.div>

        {/* Masonry Gallery */}
        <div className="gallery-masonry">
          {filteredMemories.map((memory, index) => (
            <motion.div
              key={memory.id}
              className="memory-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              layoutId={`memory-${memory.id}`}
            >
              <div className="memory-image-wrapper">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  style={{ transform: `rotate(${memory.rotation}deg)` }}
                  onClick={() => handleLightboxOpen(memory)}
                  className="memory-image"
                />

                {/* Overlay */}
                <motion.div
                  className="memory-overlay"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overlay-content">
                    <p className="memory-caption">{memory.caption}</p>
                    <p className="memory-date">
                      {new Date(memory.date).toLocaleDateString()}
                    </p>
                    <motion.button
                      className="view-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLightboxOpen(memory)}
                    >
                      View
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Card Footer */}
              <div className="memory-footer">
                <span className="memory-tag">{memory.tag}</span>
                <motion.button
                  className="delete-btn"
                  whileHover={{ scale: 1.2, color: '#e65f76' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteImage(memory.id)}
                  title="Delete memory"
                >
                  ×
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p>No memories found. Start by uploading your first photo!</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        isOpen={lightboxOpen}
        image={selectedImage}
        images={filteredMemories}
        onClose={() => setLightboxOpen(false)}
        onNext={handleLightboxNext}
        onPrev={handleLightboxPrev}
      />
    </section>
  );
}

export default AdvancedGallery;

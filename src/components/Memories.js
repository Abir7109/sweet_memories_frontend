import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaHeart } from 'react-icons/fa';
import '../styles/Memories.css';

function Memories() {
  const [memories, setMemories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadMemories = () => {
    // Load memories from localStorage
    const savedMemories = JSON.parse(localStorage.getItem('savedMemories') || '[]');
    setMemories(savedMemories);

    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteMemories') || '[]');
    setFavorites(savedFavorites);
  };

  useEffect(() => {
    loadMemories();
  }, []);

  useEffect(() => {
    // Listen for storage changes (when memories are saved)
    const handleStorageChange = () => {
      loadMemories();
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event when memory is saved
    window.addEventListener('memoryAdded', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('memoryAdded', handleStorageChange);
    };
  }, []);

  const handleToggleFavorite = (memoryId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(memoryId)
        ? prev.filter((id) => id !== memoryId)
        : [...prev, memoryId];
      localStorage.setItem('favoriteMemories', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const handleDeleteMemory = (memoryId) => {
    setMemories((prev) => {
      const updated = prev.filter((m) => m.id !== memoryId);
      localStorage.setItem('savedMemories', JSON.stringify(updated));
      return updated;
    });

    // Also remove from favorites
    setFavorites((prev) => prev.filter((id) => id !== memoryId));
  };

  const sortedMemories = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
  const favoriteMemories = sortedMemories.filter((m) => favorites.includes(m.id));
  const otherMemories = sortedMemories.filter((m) => !favorites.includes(m.id));

  if (memories.length === 0) {
    return (
      <section className="memories" id="memories">
        <div className="container">
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>No Memories Yet</h2>
            <p>Create your first memory in the "Create a Memory" section above 💕</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="memories" id="memories">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Our Beautiful Memories
        </motion.h2>

        {/* Favorite Memories */}
        {favoriteMemories.length > 0 && (
          <div className="memories-section">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="subsection-title"
            >
              ⭐ Favorite Memories
            </motion.h3>
            <div className="memories-grid">
              <AnimatePresence>
                {favoriteMemories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    className="memory-card favorite"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {memory.image && (
                      <div className="memory-image">
                        <img src={memory.image} alt={memory.title} />
                      </div>
                    )}
                    <div className="memory-content">
                      <div className="memory-header">
                        <h4>{memory.title}</h4>
                        <motion.button
                          className="favorite-btn active"
                          onClick={() => handleToggleFavorite(memory.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaHeart />
                        </motion.button>
                      </div>
                      <p className="memory-date">{new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <span className="memory-tag">{memory.tag}</span>
                      <p className="memory-description">{memory.description}</p>
                      <motion.button
                        className="delete-btn"
                        onClick={() => handleDeleteMemory(memory.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash /> Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Other Memories */}
        {otherMemories.length > 0 && (
          <div className="memories-section">
            {favoriteMemories.length > 0 && (
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                className="subsection-title"
              >
                📸 All Memories
              </motion.h3>
            )}
            <div className="memories-grid">
              <AnimatePresence>
                {otherMemories.map((memory, index) => (
                  <motion.div
                    key={memory.id}
                    className="memory-card"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {memory.image && (
                      <div className="memory-image">
                        <img src={memory.image} alt={memory.title} />
                      </div>
                    )}
                    <div className="memory-content">
                      <div className="memory-header">
                        <h4>{memory.title}</h4>
                        <motion.button
                          className="favorite-btn"
                          onClick={() => handleToggleFavorite(memory.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaHeart />
                        </motion.button>
                      </div>
                      <p className="memory-date">{new Date(memory.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <span className="memory-tag">{memory.tag}</span>
                      <p className="memory-description">{memory.description}</p>
                      <motion.button
                        className="delete-btn"
                        onClick={() => handleDeleteMemory(memory.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaTrash /> Delete
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Memories;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaHeart } from 'react-icons/fa';
import '../styles/Memories.css';

function Memories() {
  const [memories, setMemories] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const loadMemories = async () => {
    try {
      const resp = await fetch('/api/memories', { headers: { 'Accept': 'application/json' } });
      const ct = resp.headers.get('content-type') || '';
      if (!resp.ok || !ct.includes('application/json')) {
        const text = await resp.text().catch(() => '');
        throw new Error(`API /api/memories returned ${resp.status}. Body: ${text.slice(0, 120)}`);
      }
      const data = await resp.json();
      setMemories(Array.isArray(data) ? data : []);
      setFavorites((Array.isArray(data) ? data : []).filter(m => m.favorite).map(m => String(m._id)));
    } catch (e) {
      console.error('Failed to fetch memories', e);
    }
  };

  useEffect(() => {
    loadMemories();
  }, []);

  useEffect(() => {
    const handleRefresh = () => loadMemories();
    window.addEventListener('memoryAdded', handleRefresh);
    return () => window.removeEventListener('memoryAdded', handleRefresh);
  }, []);

  const handleToggleFavorite = async (memoryId) => {
    try {
      const isFav = favorites.includes(String(memoryId));
      await fetch(`/api/memories/${memoryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: !isFav }),
      });
      await loadMemories();
    } catch (e) {
      console.error('Failed to toggle favorite', e);
    }
  };

  const handleDeleteMemory = async (memoryId) => {
    try {
      await fetch(`/api/memories/${memoryId}`, { method: 'DELETE' });
      await loadMemories();
    } catch (e) {
      console.error('Failed to delete memory', e);
    }
  };

  const sortedMemories = [...memories].sort((a, b) => new Date(b.date) - new Date(a.date));
  const favoriteMemories = sortedMemories.filter((m) => favorites.includes(String(m._id)));
  const otherMemories = sortedMemories.filter((m) => !favorites.includes(String(m._id)));

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
                    key={String(memory._id || memory.id)}
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
                          onClick={() => handleToggleFavorite(memory._id)}
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
                        onClick={() => handleDeleteMemory(memory._id)}
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
                    key={String(memory._id || memory.id)}
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
                          onClick={() => handleToggleFavorite(memory._id)}
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
                        onClick={() => handleDeleteMemory(memory._id)}
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

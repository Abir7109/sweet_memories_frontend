import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaHeart } from 'react-icons/fa';
import '../styles/Lightbox.css';

function Lightbox({ isOpen, image, onClose, onNext, onPrev, images = [] }) {
  const [scale, setScale] = useState(0.3);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  const handleZoom = (direction) => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.max(0.5, Math.min(3, newScale));
    });
  };

  const handleReset = () => {
    setScale(0.3);
    setIsFullscreen(false);
  };

  if (!isOpen || !image) return null;

  const currentIndex = images.findIndex((img) => img.id === image.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`lightbox-container ${isFullscreen ? 'fullscreen' : ''}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="lightbox-header">
              <div className="image-info">
                <h3>{image.caption}</h3>
                <p className="image-date">
                  {new Date(image.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {image.tag && <span className="image-tag">{image.tag}</span>}
              </div>

              <div className="header-controls">
                <motion.button
                  className="control-btn favorite"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <FaHeart color={isFavorite ? '#e65f76' : 'white'} />
                </motion.button>
                <motion.button
                  className="control-btn"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </motion.button>
                <motion.button
                  className="control-btn"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                >
                  <FaTimes />
                </motion.button>
              </div>
            </div>

            {/* Main Image Viewer */}
            <div className="lightbox-viewer">
              <motion.div
                className="image-container"
                animate={{ scale }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <img
                  src={image.image}
                  alt={image.caption}
                  style={{ transform: `rotate(${image.rotation || 0}deg)` }}
                />
              </motion.div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <motion.button
                    className="nav-btn prev"
                    whileHover={{ scale: 1.15, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onPrev}
                  >
                    <FaChevronLeft />
                  </motion.button>
                  <motion.button
                    className="nav-btn next"
                    whileHover={{ scale: 1.15, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                  >
                    <FaChevronRight />
                  </motion.button>

                  {/* Image Counter */}
                  <div className="image-counter">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Zoom Controls */}
            <div className="lightbox-controls">
              <motion.button
                className="zoom-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleZoom('out')}
                disabled={scale <= 0.3}
              >
                −
              </motion.button>

              <div className="zoom-display">{Math.round(scale * 100)}%</div>

              <motion.button
                className="zoom-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleZoom('in')}
                disabled={scale >= 3}
              >
                +
              </motion.button>

              <motion.button
                className="reset-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
              >
                Reset
              </motion.button>
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div className="lightbox-thumbnails">
                <div className="thumbnails-scroll">
                  {images.map((img, index) => (
                    <motion.div
                      key={img.id}
                      className={`thumbnail ${img.id === image.id ? 'active' : ''}`}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        // Navigate to thumbnail
                        const diff = index - currentIndex;
                        if (diff > 0) {
                          for (let i = 0; i < diff; i++) onNext();
                        } else {
                          for (let i = 0; i < -diff; i++) onPrev();
                        }
                      }}
                    >
                      <img src={img.image} alt={img.caption} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Lightbox;

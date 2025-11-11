import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTimes, FaSyncAlt } from 'react-icons/fa';
import '../styles/ImageUpload.css';

function ImageUpload({ onImageAdd }) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [imageData, setImageData] = useState({
    caption: '',
    date: new Date().toISOString().split('T')[0],
    tag: 'First Date',
  });
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef(null);

  const tags = ['First Date', 'Travel', 'Festivals', 'Random Laughs', 'Other'];

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowPreview(true);
        setRotation(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const handleAddImage = () => {
    if (preview && imageData.caption) {
      onImageAdd({
        id: Date.now(),
        image: preview,
        caption: imageData.caption,
        date: imageData.date,
        tag: imageData.tag,
        rotation: rotation,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setPreview(null);
    setShowPreview(false);
    setImageData({
      caption: '',
      date: new Date().toISOString().split('T')[0],
      tag: 'First Date',
    });
    setRotation(0);
  };

  return (
    <motion.div
      className="image-upload-container"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h3>Add Your Memory</h3>

      <AnimatePresence>
        {!showPreview ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`drag-drop-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FaCloudUploadAlt className="upload-icon" />
                <p>Drag photos here or click to select</p>
                <span>JPG, PNG up to 10MB</span>
              </motion.div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: 'none' }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="preview-section"
          >
            <div className="image-editor">
              <div className="image-preview">
                <img
                  src={preview}
                  alt="Preview"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </div>

              <div className="editor-controls">
                <motion.button
                  className="edit-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRotate}
                  title="Rotate 90°"
                >
                  <FaSyncAlt /> Rotate
                </motion.button>
              </div>
            </div>

            <div className="form-fields">
              <input
                type="text"
                placeholder="Photo caption (required)"
                value={imageData.caption}
                onChange={(e) =>
                  setImageData({ ...imageData, caption: e.target.value })
                }
                className="input-field"
              />

              <input
                type="date"
                value={imageData.date}
                onChange={(e) =>
                  setImageData({ ...imageData, date: e.target.value })
                }
                className="input-field"
              />

              <select
                value={imageData.tag}
                onChange={(e) =>
                  setImageData({ ...imageData, tag: e.target.value })
                }
                className="input-field"
              >
                {tags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <div className="button-group">
                <motion.button
                  className="btn-cancel"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                >
                  <FaTimes /> Cancel
                </motion.button>
                <motion.button
                  className="btn-add"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddImage}
                  disabled={!imageData.caption}
                >
                  Add to Gallery
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ImageUpload;

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/CreateMemory.css';

function CreateMemory() {
  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    title: '',
    date: getTodayDate(),
    description: '',
    tag: 'Random Laughs',
    fileInput: null,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        fileInput: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64 = null;
      if (formData.fileInput) {
        base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.fileInput);
        });
      }

      const resp = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          date: formData.date,
          description: formData.description,
          tag: formData.tag,
          image: base64,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to save memory');
      }

      // Notify list to refresh
      window.dispatchEvent(new Event('memoryAdded'));
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({ title: '', date: getTodayDate(), description: '', tag: 'Random Laughs', fileInput: null });
        if (fileInputRef.current) fileInputRef.current.value = '';
        setIsSubmitted(false);
      }, 1200);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section className="create-memory" id="create">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Create a Memory
        </motion.h2>

        <motion.form
          className="memory-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="form-row">
            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label htmlFor="title">Memory Title</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Give your memory a beautiful name..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </motion.div>
          </div>

          <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
            <label htmlFor="description">Your Story</label>
            <textarea
              id="description"
              name="description"
              placeholder="Tell us the story behind this moment..."
              rows="6"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </motion.div>

          <div className="form-row">
            <motion.div className="form-group" whileFocus={{ scale: 1.02 }}>
              <label htmlFor="tag">Category</label>
              <select name="tag" id="tag" value={formData.tag} onChange={handleChange}>
                <option value="First Date">First Date 💕</option>
                <option value="Travel">Travel ✈️</option>
                <option value="Festivals">Festivals 🎉</option>
                <option value="Random Laughs">Random Laughs 😄</option>
              </select>
            </motion.div>

            <motion.div className="form-group file-input">
              <label htmlFor="file">Upload Photo</label>
              <input
                ref={fileInputRef}
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <span 
                className="file-label"
                onClick={() => fileInputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    fileInputRef.current?.click();
                  }
                }}
              >
                {formData.fileInput ? formData.fileInput.name : 'Choose a photo...'}
              </span>
            </motion.div>
          </div>

          <motion.button
            type="submit"
            className="submit-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSubmitted ? '💕 Saved!' : 'Save Memory 💕'}
          </motion.button>

          {isSubmitted && (
            <motion.div
              className="success-message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              ✨ Your memory has been saved beautifully! ✨
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default CreateMemory;

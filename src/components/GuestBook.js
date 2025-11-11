import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/GuestBook.css';

function GuestBook() {
  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(formData.name.trim() && formData.message.trim())) return;
    try {
      const { API_BASE } = await import('../config');
      const resp = await fetch(`${API_BASE}/api/guestbook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name.trim(), message: formData.message.trim() }),
      });
      if (!resp.ok) throw new Error('Failed to add message');
      const saved = await resp.json();
      setMessages((prev) => [saved, ...prev]);
      setFormData({ name: '', message: '' });
    } catch (e) {
      console.error(e);
      alert('Unable to post message');
    }
  };

  React.useEffect(() => {
    (async () => {
      try {
        const { API_BASE } = await import('../config');
        const resp = await fetch(`${API_BASE}/api/guestbook`, { headers: { 'Accept': 'application/json' } });
        const ct = resp.headers.get('content-type') || '';
        if (!resp.ok || !ct.includes('application/json')) {
          const text = await resp.text().catch(() => '');
          throw new Error(`API /api/guestbook returned ${resp.status}. Body: ${text.slice(0, 120)}`);
        }
        const data = await resp.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load guestbook', e);
      }
    })();
  }, []);

  return (
    <section className="guest-book" id="guest-book">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title"
        >
          Guest Book - Abir & MoonMoon
        </motion.h2>

        <div className="guest-book-content">
          {/* Add Message Form */}
          <motion.div
            className="add-message-form"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Leave a Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message..."
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Guest Book
              </motion.button>
            </form>
          </motion.div>

          {/* Messages Display */}
          <motion.div
            className="messages-list"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Messages ({messages.length})</h3>
            <div className="messages-scroll">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  className="message-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="message-header">
                    <h4>{msg.name}</h4>
                    <span className="message-date">{new Date(msg.createdAt || msg.date).toISOString().slice(0,10)}</span>
                  </div>
                  <p>{msg.message}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default GuestBook;

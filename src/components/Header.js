import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import '../styles/Header.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const navItems = ['Home', 'Gallery', 'Timeline', 'Love Notes', 'Create'];

  return (
    <header className="header">
      <motion.div
        className="header-container"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Logo */}
        <motion.div className="logo" whileHover={{ scale: 1.05 }}>
          <img src="/love.gif" alt="Love" className="logo-icon" />
          <h1 className="logo-text">Abir & MoonMoon</h1>
        </motion.div>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <motion.li
                key={item}
                whileHover={{ y: -3 }}
                transition={{ delay: index * 0.05 }}
              >
                <a href={`#${item.toLowerCase()}`} className="nav-link">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Desktop Search Bar */}
        <motion.div 
          className={`search-bar ${isFocused ? 'focused' : ''}`}
          animate={{ boxShadow: isFocused ? '0 4px 20px rgba(165, 61, 80, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)' }}
        >
          {/* Tulip GIF */}
          <img
            src="/tulip.gif"
            alt="Tulip"
            className="tulip-gif"
          />

          {/* Input */}
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="search-input"
          />

          {/* Search Button */}
          <motion.button
            className="search-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch />
          </motion.button>
        </motion.div>

        {/* Mobile Search Icon */}
        <motion.button
          className="mobile-search-btn"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaSearch />
        </motion.button>

        {/* Mobile Menu Button */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsNavOpen(!isNavOpen)}
          whileTap={{ scale: 0.95 }}
        >
          ☰
        </motion.button>
      </motion.div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <motion.div
          className="mobile-search-bar"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mobile-search-content">
            <img src="/tulip.gif" alt="Tulip" className="mobile-tulip-gif" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
              autoFocus
            />
            <motion.button
              className="mobile-search-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation */}
      {isNavOpen && (
        <motion.div
          className="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="mobile-nav-list">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}

export default Header;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/TogetherSince.css';

function TogetherSince() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Start date: June 1, 2025
      const startDate = new Date('2025-06-01T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = now - startDate;

      if (difference > 0) {
        setTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => {
    const displayValue = String(value).padStart(2, '0');
    const prevValueRef = React.useRef(displayValue);
    const [shouldFlip, setShouldFlip] = React.useState(false);

    React.useEffect(() => {
      if (prevValueRef.current !== displayValue) {
        setShouldFlip(true);
        prevValueRef.current = displayValue;
        const timer = setTimeout(() => setShouldFlip(false), 400);
        return () => clearTimeout(timer);
      }
    }, [displayValue]);
    
    return (
      <div className="time-unit">
        <div className="time-value">
          <motion.span
            className="number"
            animate={shouldFlip ? { rotationY: [0, 90, 0], opacity: 1 } : { rotationY: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {displayValue}
          </motion.span>
        </div>
        <p className="time-label">{label}</p>
      </div>
    );
  };

  return (
    <section className="together-since">
      <div className="container">
        <div className="together-header">
          <h2>We Are Together Since...</h2>
          <p>Every moment with you is a precious memory</p>
        </div>

        <div className="timer-container">
          <div className="timer-background">
            <div className="timer-glow" />
          </div>

          <div className="time-display">
            <TimeUnit value={time.days} label="Days" />
            <div className="separator">:</div>
            <TimeUnit value={time.hours} label="Hours" />
            <div className="separator">:</div>
            <TimeUnit value={time.minutes} label="Minutes" />
            <div className="separator">:</div>
            <TimeUnit value={time.seconds} label="Seconds" />
          </div>
        </div>

        <div className="together-message">
          <p>
            🌸 Abir & MoonMoon 🌸
            <br />
            <span className="love-message">
              "Every second spent with you is a lifetime of happiness"
            </span>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="decoration-top-left" />
        <div className="decoration-bottom-right" />
      </div>
    </section>
  );
}

export default TogetherSince;

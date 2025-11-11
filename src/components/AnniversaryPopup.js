import React, { useState, useEffect, useRef } from 'react';
import '../styles/AnniversaryPopup.css';

// Anniversary Configuration - June 12, 2025 (THE REAL DATE!)
const ANNIVERSARY_START = new Date('2025-06-12');

const AnniversaryPopup = () => {
  const [show, setShow] = useState(false);
  const [monthsCount, setMonthsCount] = useState(0);
  const canvasRef = useRef(null);
  const animationIdRef = useRef(null);
  const dprRef = useRef(1);
  
  // Calculate months
  const calculateMonths = () => {
    const today = new Date();
    const years = today.getFullYear() - ANNIVERSARY_START.getFullYear();
    const months = today.getMonth() - ANNIVERSARY_START.getMonth();
    return years * 12 + months;
  };


  // Keep a CSS custom property for stable viewport height on mobile browsers
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--safe-vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  // Confetti Animation (mobile-optimized)
  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
      dprRef.current = dpr;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    // fewer pieces on small screens
    const cssWidth = window.innerWidth;
    const confettiCount = cssWidth < 480 ? 70 : cssWidth < 768 ? 100 : 150;
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4'];

    class Confetti {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * window.innerWidth;
        this.y = initial ? -20 : -10;
        this.size = Math.random() * 6 + 4; // slightly smaller for mobile
        this.speed = Math.random() * 2 + 1.5; // slower for mobile smoothness
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 6 - 3;
        this.swing = Math.random() * 1.5 - 0.75;
      }
      update() {
        this.y += this.speed;
        this.x += this.swing;
        this.rotation += this.rotationSpeed;
        if (this.y > window.innerHeight + 20) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    const confettiPieces = Array.from({ length: confettiCount }, () => new Confetti());

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const piece of confettiPieces) {
        piece.update();
        piece.draw();
      }
      animationIdRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [show]);

  // Initialize
  useEffect(() => {
    // TEMPORARY: Always show for testing - change back after
    const shouldShow = true; // Change to: isAnniversaryDay()
    
    if (shouldShow) {
      // TEMP: Remove localStorage check to always show
      setTimeout(() => {
        setShow(true);
        // animate the counter locally to avoid hook deps
        const targetMonths = calculateMonths();
        let current = 0;
        const increment = Math.max(1, targetMonths / 50);
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetMonths) {
            setMonthsCount(targetMonths);
            clearInterval(timer);
          } else {
            setMonthsCount(Math.floor(current));
          }
        }, 30);
      }, 500);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <canvas ref={canvasRef} className="confetti-canvas" />
      
      <div className="anniversary-popup-overlay" onClick={handleClose}>
        <div className="anniversary-popup" onClick={(e) => e.stopPropagation()}>
          {/* Hearts Background */}
          <div className="hearts-container">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${Math.random() * 3 + 4}s`,
                }}
              >
                {['💕', '💖', '💗', '💓', '💝', '💞'][Math.floor(Math.random() * 6)]}
              </div>
            ))}
          </div>

          {/* Icon */}
          <div className="anniversary-icon">💖</div>

          {/* Title */}
          <h1 className="anniversary-title">Happy Anniversary!</h1>

          {/* Subtitle */}
          <p className="anniversary-subtitle">Celebrating Our Love Story</p>

          {/* Counter */}
          <div className="counter-box">
            <div className="counter-number">{monthsCount}</div>
            <div className="counter-label">Months Together</div>
          </div>

          {/* Message */}
          <p className="anniversary-message">
            Since <strong>June 12, 2025</strong>, every moment with you has been magical.
            Here's to many more beautiful memories together! 💕✨
          </p>

          {/* Close Button */}
          <button className="close-btn" onClick={handleClose}>
            Celebrate! 🎉
          </button>
        </div>
      </div>
    </>
  );
};

export default AnniversaryPopup;

import React, { useState, useEffect, useRef } from 'react';
import '../styles/AnniversaryPopup.css';

const AnniversaryPopup = () => {
  const [show, setShow] = useState(false);
  const [monthsCount, setMonthsCount] = useState(0);
  const canvasRef = useRef(null);

  // Anniversary Configuration - June 12, 2025 (THE REAL DATE!)
  const ANNIVERSARY_START = new Date('2025-06-12');
  
  // Calculate months
  const calculateMonths = React.useCallback(() => {
    const today = new Date();
    const years = today.getFullYear() - ANNIVERSARY_START.getFullYear();
    const months = today.getMonth() - ANNIVERSARY_START.getMonth();
    return years * 12 + months;
  }, []);

  // Check if it's anniversary day (12th of any month)
  const isAnniversaryDay = React.useCallback(() => {
    const today = new Date();
    return today.getDate() === 12; // Monthly anniversary on the 12th
  }, []);

  // Animate counter
  const animateCounter = React.useCallback(() => {
    const targetMonths = calculateMonths();
    let current = 0;
    const increment = targetMonths / 50;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetMonths) {
        setMonthsCount(targetMonths);
        clearInterval(timer);
      } else {
        setMonthsCount(Math.floor(current));
      }
    }, 30);
  }, [calculateMonths]);

  // Confetti Animation
  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const confettiCount = 150;
    const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#ffd700', '#ff69b4'];

    class Confetti {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 8 + 5;
        this.speed = Math.random() * 3 + 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.swing = Math.random() * 2 - 1;
      }

      update() {
        this.y += this.speed;
        this.x += this.swing;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
          this.y = -20;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }
    }

    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push(new Confetti());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach(piece => {
        piece.update();
        piece.draw();
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [show]);

  // Initialize
  useEffect(() => {
    console.log('Anniversary Popup: Initializing...');
    // TEMPORARY: Always show for testing - change back after
    const shouldShow = true; // Change to: isAnniversaryDay()
    
    if (shouldShow) {
      console.log('Anniversary Popup: Should show is true');
      const lastShown = localStorage.getItem('anniversaryPopupShown');
      const todayString = new Date().toDateString();
      console.log('Last shown:', lastShown, 'Today:', todayString);

      // TEMP: Remove localStorage check to always show
      setTimeout(() => {
        console.log('Anniversary Popup: Setting show to true');
        setShow(true);
        animateCounter();
        // localStorage.setItem('anniversaryPopupShown', todayString);
      }, 500);
    }
  }, [animateCounter, isAnniversaryDay]);

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
            {[...Array(15)].map((_, i) => (
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

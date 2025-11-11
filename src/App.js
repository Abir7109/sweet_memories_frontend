import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import TogetherSince from './components/TogetherSince';
import FolderGallery from './components/FolderGallery';
import Timeline from './components/Timeline';
import LoveNotes from './components/LoveNotes';
import CreateMemory from './components/CreateMemory';
import Memories from './components/Memories';
import AboutUs from './components/AboutUs';
import GuestBook from './components/GuestBook';
import AnniversaryPopup from './components/AnniversaryPopup';
import './styles/App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <div className="app">
          <AnniversaryPopup />
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <TogetherSince />
                <AboutUs />
                <FolderGallery />
                <Timeline />
                <LoveNotes />
                <CreateMemory />
                <Memories />
                <GuestBook />
              </>
            } />
          </Routes>
          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;

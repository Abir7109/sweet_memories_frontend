import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFolder, FaChevronLeft, FaLock, FaExpand, FaPlus, FaTrash, FaTimes, FaCheckCircle, FaCircle } from 'react-icons/fa';
import Lightbox from './Lightbox';
import '../styles/FolderGallery.css';

function FolderGallery() {
  const [folders, setFolders] = useState([
    {
      id: 'exploring',
      name: 'Exploring Together',
      icon: '🌍',
      color: '#c85a6f',
      photos: [
        { id: 1, image: '/gallery/IMG-20251020-WA0006.jpg', caption: 'Adventure Awaits' },
        { id: 2, image: '/gallery/IMG-20251020-WA0022.jpg', caption: 'New Places, Same Love' },
        { id: 5, image: '/gallery/IMG-20251020-WA0120.jpg', caption: 'Exploring the World Together' },
        { id: 10, image: '/gallery/IMG-20251020-WA0346.jpg', caption: 'Discovering New Memories' },
      ]
    },
    {
      id: 'eating',
      name: 'Eating Together',
      icon: '🍽️',
      color: '#d4a5b0',
      photos: [
        { id: 3, image: '/gallery/IMG-20251020-WA0048.jpg', caption: 'Delicious Moments' },
        { id: 4, image: '/gallery/IMG-20251020-WA0099.jpg', caption: 'Taste of Love' },
        { id: 7, image: '/gallery/IMG-20251020-WA0211.jpg', caption: 'Food & Love' },
        { id: 11, image: '/gallery/IMG-20251020-WA0365.jpg', caption: 'Sweet Treats' },
      ]
    },
    {
      id: 'funtime',
      name: 'Fun Time',
      icon: '🎉',
      color: '#a53d50',
      photos: [
        { id: 6, image: '/gallery/IMG-20251020-WA0164.jpg', caption: 'Laughs & Smiles' },
        { id: 8, image: '/gallery/IMG-20251020-WA0213.jpg', caption: 'Pure Joy' },
        { id: 9, image: '/gallery/IMG-20251020-WA0333.jpg', caption: 'Silly Moments' },
      ]
    },
    {
      id: 'special',
      name: '✨ Special Moments ✨',
      icon: '💎',
      color: '#ff6b9d',
      isSpecial: true,
      photos: [
        { id: 1, image: '/love-story.jpg', caption: 'Our Love Story' },
        { id: 2, image: '/couple-hero.jpg', caption: 'Us Against the World' },
      ]
    }
  ]);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showHiddenFolder, setShowHiddenFolder] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadPreview, setUploadPreview] = useState(null);
  const [removeModal, setRemoveModal] = useState(false);
  const [selectedPhotosForRemoval, setSelectedPhotosForRemoval] = useState([]);
  const [pinModal, setPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [unlockedFolders, setUnlockedFolders] = useState([]);
  const [pinError, setPinError] = useState('');
  const correctPin = '2025'; // PIN to access hidden folder
  const fileInputRef = React.useRef(null);


  // Check for special folder trigger - always show for now
  useEffect(() => {
    setShowHiddenFolder(true);
    // Load saved folders from localStorage
    const saved = localStorage.getItem('folderPhotos');
    if (saved) {
      try {
        setFolders(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading photos:', e);
      }
    }
  }, []);

  // Save folders to localStorage
  useEffect(() => {
    localStorage.setItem('folderPhotos', JSON.stringify(folders));
  }, [folders]);

  const displayFolders = showHiddenFolder ? folders : folders.filter(f => !f.isSpecial);

  const handleFolderOpen = (folder) => {
    // Check if it's the special folder and not unlocked
    if (folder.isSpecial && !unlockedFolders.includes(folder.id)) {
      // Don't set selected folder yet, just open PIN modal
      setPinModal(true);
      setPinInput('');
      setPinError('');
      // Store the folder to open after PIN verification
      sessionStorage.setItem('pendingFolder', JSON.stringify(folder));
      return;
    }
    setSelectedFolder(folder);
  };

  const handlePhotoClick = (photo) => {
    setSelectedImage(photo);
    setLightboxOpen(true);
  };

  const handleLightboxNext = () => {
    if (!selectedFolder) return;
    const currentIndex = selectedFolder.photos.findIndex((p) => p.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % selectedFolder.photos.length;
    setSelectedImage(selectedFolder.photos[nextIndex]);
  };

  const handleLightboxPrev = () => {
    if (!selectedFolder) return;
    const currentIndex = selectedFolder.photos.findIndex((p) => p.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + selectedFolder.photos.length) % selectedFolder.photos.length;
    setSelectedImage(selectedFolder.photos[prevIndex]);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadPreview(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = () => {
    if (!uploadPreview || !uploadCaption.trim() || !selectedFolder) return;

    const newPhoto = {
      id: Date.now(),
      image: uploadPreview,
      caption: uploadCaption,
    };

    const updatedFolders = folders.map(f =>
      f.id === selectedFolder.id
        ? { ...f, photos: [...f.photos, newPhoto] }
        : f
    );
    
    setFolders(updatedFolders);
    setSelectedFolder({ ...selectedFolder, photos: selectedFolder.photos.concat(newPhoto) });

    // Reset form
    setUploadCaption('');
    setUploadPreview(null);
    setUploadModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (photoId) => {
    if (!selectedFolder) return;
    setFolders(folders.map(f =>
      f.id === selectedFolder.id
        ? { ...f, photos: f.photos.filter(p => p.id !== photoId) }
        : f
    ));
  };

  const togglePhotoForRemoval = (photoId) => {
    setSelectedPhotosForRemoval(prev =>
      prev.includes(photoId)
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleRemoveSelectedPhotos = () => {
    if (selectedPhotosForRemoval.length === 0 || !selectedFolder) return;

    const updatedFolders = folders.map(f =>
      f.id === selectedFolder.id
        ? { ...f, photos: f.photos.filter(p => !selectedPhotosForRemoval.includes(p.id)) }
        : f
    );

    setFolders(updatedFolders);
    setSelectedFolder({
      ...selectedFolder,
      photos: selectedFolder.photos.filter(p => !selectedPhotosForRemoval.includes(p.id))
    });
    setSelectedPhotosForRemoval([]);
    setRemoveModal(false);
  };

  const handleOpenRemoveModal = () => {
    setSelectedPhotosForRemoval([]);
    setRemoveModal(true);
  };

  const handlePinSubmit = () => {
    if (pinInput === correctPin) {
      // Correct PIN - now unlock the folder
      const pendingFolderStr = sessionStorage.getItem('pendingFolder');
      if (pendingFolderStr) {
        const pendingFolder = JSON.parse(pendingFolderStr);
        setUnlockedFolders([...unlockedFolders, pendingFolder.id]);
        setSelectedFolder(pendingFolder);
        sessionStorage.removeItem('pendingFolder');
      }
      setPinModal(false);
      setPinInput('');
      setPinError('');
    } else {
      // Wrong PIN
      setPinError('Incorrect PIN. Try again.');
      setPinInput('');
    }
  };

  const handleClosePinModal = () => {
    setPinModal(false);
    setPinInput('');
    setPinError('');
    sessionStorage.removeItem('pendingFolder');
  };

  return (
    <section className="folder-gallery" id="gallery">
      <div className="container">
        {/* Header */}
        <motion.div
          className="gallery-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Our Memory Folders</h2>
          <p>Organized moments of our beautiful journey</p>
        </motion.div>

        {/* Folder View or Photo View */}
        <AnimatePresence mode="wait">
          {!selectedFolder ? (
            // Folders Grid
            <motion.div
              key="folders"
              className="folders-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {displayFolders.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  className={`folder-card ${folder.id === 'special' ? 'special-folder' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  onClick={() => handleFolderOpen(folder)}
                >
                  <div className="folder-icon" style={{ background: folder.color }}>
                    {folder.id === 'special' ? <FaLock /> : <FaFolder />}
                  </div>
                  <div className="folder-info">
                    <h3>{folder.name}</h3>
                    <p>{folder.photos.length} photos</p>
                  </div>
                  <div className="folder-emoji">{folder.icon}</div>
                  {folder.id === 'special' && <div className="special-badge">✨ Hidden</div>}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Photos Grid
            <motion.div
              key="photos"
              className="photos-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Back Button */}
              <motion.button
                className="back-btn"
                onClick={() => {
                  setSelectedFolder(null);
                  setLightboxOpen(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaChevronLeft /> Back to Folders
              </motion.button>

              {/* Folder Title with Upload Button */}
              <div className="folder-title-bar">
                <div className="folder-title">
                  <span className="folder-emoji-large">{selectedFolder.icon}</span>
                  <h2>{selectedFolder.name}</h2>
                </div>
                <div className="folder-action-buttons">
                  <motion.button
                    className="upload-icon-btn"
                    onClick={() => setUploadModal(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Add photo to this folder"
                  >
                    <FaPlus />
                  </motion.button>
                  <motion.button
                    className="remove-icon-btn"
                    onClick={handleOpenRemoveModal}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Remove photos from this folder"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="photos-grid">
                {selectedFolder.photos.map((photo, index) => (
                  <motion.div
                    key={photo.id}
                    className="photo-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <div className="photo-wrapper" onClick={() => handlePhotoClick(photo)}>
                      <img src={photo.image} alt={photo.caption} />
                      <motion.div
                        className="photo-overlay"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="overlay-content">
                          <p className="photo-caption">{photo.caption}</p>
                          <FaExpand className="expand-icon" />
                        </div>
                      </motion.div>
                    </div>
                    <motion.button
                      className="photo-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePhoto(photo.id);
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      title="Delete this photo"
                    >
                      <FaTrash />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModal && (
          <motion.div
            className="upload-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setUploadModal(false);
              setUploadPreview(null);
              setUploadCaption('');
              if (fileInputRef.current) fileInputRef.current.value = '';
            }}
          >
            <motion.div
              className="upload-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="upload-modal-header">
                <h3>Add Photo to {selectedFolder?.name}</h3>
                <motion.button
                  className="modal-close-btn"
                  onClick={() => {
                    setUploadModal(false);
                    setUploadPreview(null);
                    setUploadCaption('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className="upload-modal-content">
                {/* File Input */}
                <div className="file-input-wrapper">
                  <input
                    id="file-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="file-label">
                    <FaPlus /> Choose Photo
                  </label>
                </div>

                {/* Preview */}
                {uploadPreview && (
                  <motion.div
                    className="preview-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <img src={uploadPreview} alt="Preview" className="preview-image" />
                  </motion.div>
                )}

                {/* Caption Input */}
                <div className="caption-input-wrapper">
                  <label htmlFor="caption">Photo Caption</label>
                  <input
                    id="caption"
                    type="text"
                    placeholder="Enter a caption for this photo..."
                    value={uploadCaption}
                    onChange={(e) => setUploadCaption(e.target.value)}
                    className="caption-input"
                  />
                </div>

                {/* Action Buttons */}
                <div className="modal-actions">
                  <motion.button
                    className="cancel-btn"
                    onClick={() => {
                      setUploadModal(false);
                      setUploadPreview(null);
                      setUploadCaption('');
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    className="upload-btn"
                    onClick={handleUploadPhoto}
                    disabled={!uploadPreview || !uploadCaption.trim()}
                    whileHover={uploadPreview && uploadCaption.trim() ? { scale: 1.05 } : {}}
                    whileTap={uploadPreview && uploadCaption.trim() ? { scale: 0.95 } : {}}
                  >
                    Upload Photo
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Remove Photos Modal */}
      <AnimatePresence>
        {removeModal && selectedFolder && (
          <motion.div
            className="upload-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRemoveModal(false)}
          >
            <motion.div
              className="upload-modal remove-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="upload-modal-header">
                <h3>Remove Photos from {selectedFolder.name}</h3>
                <motion.button
                  className="modal-close-btn"
                  onClick={() => setRemoveModal(false)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className="remove-photos-content">
                {selectedFolder.photos.length === 0 ? (
                  <p className="no-photos-text">No photos in this folder</p>
                ) : (
                  <>
                    <p className="select-info">
                      Click on photos to select them for removal ({selectedPhotosForRemoval.length} selected)
                    </p>
                    <div className="remove-photos-grid">
                      {selectedFolder.photos.map((photo) => (
                        <motion.div
                          key={photo.id}
                          className={`remove-photo-item ${selectedPhotosForRemoval.includes(photo.id) ? 'selected' : ''}`}
                          onClick={() => togglePhotoForRemoval(photo.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src={photo.image} alt={photo.caption} />
                          <div className="photo-overlay-remove">
                            {selectedPhotosForRemoval.includes(photo.id) ? (
                              <FaCheckCircle className="check-icon" />
                            ) : (
                              <FaCircle className="circle-icon" />
                            )}
                          </div>
                          <p className="remove-caption">{photo.caption}</p>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="modal-actions remove-modal-actions">
                <motion.button
                  className="cancel-btn"
                  onClick={() => setRemoveModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="delete-btn"
                  onClick={handleRemoveSelectedPhotos}
                  disabled={selectedPhotosForRemoval.length === 0}
                  whileHover={selectedPhotosForRemoval.length > 0 ? { scale: 1.05 } : {}}
                  whileTap={selectedPhotosForRemoval.length > 0 ? { scale: 0.95 } : {}}
                >
                  Delete {selectedPhotosForRemoval.length} Photo{selectedPhotosForRemoval.length !== 1 ? 's' : ''}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PIN Modal */}
      <AnimatePresence>
        {pinModal && (
          <motion.div
            className="upload-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePinModal}
          >
            <motion.div
              className="pin-modal"
              initial={{ scale: 0.8, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pin-modal-header">
                <div className="pin-lock-icon">🔐</div>
                <h3>Enter PIN</h3>
                <p>Access the special moments folder</p>
              </div>

              <div className="pin-modal-content">
                <div className="pin-input-wrapper">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handlePinSubmit();
                    }}
                    placeholder="Enter PIN"
                    className="pin-input"
                    autoFocus
                    maxLength="4"
                  />
                </div>

                {pinError && (
                  <motion.p
                    className="pin-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {pinError}
                  </motion.p>
                )}
              </div>

              <div className="pin-modal-actions">
                <motion.button
                  className="cancel-btn"
                  onClick={handleClosePinModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="pin-submit-btn"
                  onClick={handlePinSubmit}
                  disabled={pinInput.length !== 4}
                  whileHover={pinInput.length === 4 ? { scale: 1.05 } : {}}
                  whileTap={pinInput.length === 4 ? { scale: 0.95 } : {}}
                >
                  Unlock
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      {selectedFolder && (
        <Lightbox
          isOpen={lightboxOpen}
          image={selectedImage}
          images={selectedFolder.photos}
          onClose={() => setLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </section>
  );
}

export default FolderGallery;

# 💕 Sweet Memories

A beautifully designed romantic website celebrating a couple's journey together. Built with React, Framer Motion, and GSAP for smooth, immersive animations.

## ✨ Features

- **Loading Screen**: Animated rose blooming with petal particles
- **Hero Section**: Full-screen background with floating hearts and glowing title
- **Gallery**: Interactive memory cards with filtering by tags
- **Timeline**: Animated milestones showcasing important moments
- **Love Notes**: Carousel of sweet messages between partners
- **Create Memory**: Form to add new photos and stories
- **Responsive Design**: Fully optimized for all screen sizes
- **Smooth Animations**: Powered by Framer Motion for fluid interactions

## 🎨 Color Palette

- **Primary Pink**: `#e65f76`
- **Highlight Pink**: `#ff8795`
- **Accent Pink**: `#f2aaaa`
- **Background Cream**: `#fae5c2`
- **Base Cream**: `#feffe9`

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd C:\Users\Abir\sweet_memories
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm start
```

The site will open at `http://localhost:3000`

### Build

Create an optimized production build:
```bash
npm run build
```

## 📂 Project Structure

```
sweet_memories/
├── public/
│   └── index.html           # HTML entry point
├── src/
│   ├── components/          # React components
│   │   ├── Header.js        # Navigation and search
│   │   ├── HeroSection.js   # Hero section with hero content
│   │   ├── Gallery.js       # Memory gallery with filtering
│   │   ├── Timeline.js      # Milestones timeline
│   │   ├── LoveNotes.js     # Love notes carousel
│   │   ├── CreateMemory.js  # Form for adding memories
│   │   ├── LoadingScreen.js # Loading animation
│   │   └── Footer.js        # Footer with animations
│   ├── styles/              # CSS files
│   │   ├── index.css        # Global styles
│   │   ├── App.css          # App layout styles
│   │   ├── Header.css       # Header styles
│   │   ├── HeroSection.css  # Hero styles
│   │   ├── Gallery.css      # Gallery styles
│   │   ├── Timeline.css     # Timeline styles
│   │   ├── LoveNotes.css    # Love notes styles
│   │   ├── CreateMemory.css # Form styles
│   │   ├── LoadingScreen.css# Loading screen styles
│   │   └── Footer.css       # Footer styles
│   ├── App.js               # Main app component
│   └── index.js             # React root
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎬 Components Overview

### LoadingScreen
- Animated rose emoji with rotating petal particles
- Glowing loading text
- Fades out after 3 seconds

### Header
- Sticky navigation bar
- Search functionality with tulip decorations
- Responsive mobile menu

### HeroSection
- Full-screen background image
- Glowing title with glow animation
- Floating hearts animation
- Call-to-action button

### Gallery
- Responsive grid layout
- Filter tags for categorization
- Hover overlay with image details
- Badge system for memory categories

### Timeline
- Alternating left-right layout
- Connecting line between milestones
- Icon emojis for each milestone
- Hover effects on cards

### LoveNotes
- Carousel with prev/next buttons
- 3D flip animation between notes
- Navigation dots
- Floating emoji animations

### CreateMemory
- Multi-field form for memory details
- File upload for photos
- Category selection
- Success message animation

### Footer
- Animated heartbeat effect
- Social links
- Floating decorative elements
- Copyright information

## 🎨 Customization

### Colors
Modify CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-pink: #e65f76;
  --highlight-pink: #ff8795;
  --accent-pink: #f2aaaa;
  --background-cream: #fae5c2;
  --base-cream: #feffe9;
}
```

### Font
Change font in `public/index.html` or update font imports in CSS files.

### Content
Update the memories array in `Gallery.js` to add/modify gallery items.
Update milestones in `Timeline.js` for timeline events.
Update notes in `LoveNotes.js` for love notes.

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🛠 Technologies Used

- **React 18**: UI framework
- **Framer Motion 10**: Animation library
- **GSAP 3**: Animation engine
- **React Icons**: Icon library
- **React Router**: Navigation
- **CSS3**: Styling with custom properties

## 📝 License

Created with ❤️ for celebrating love stories.

## 🎯 Future Enhancements

- Backend integration for storing memories
- User authentication
- Photo gallery with lightbox
- Voice notes feature
- Timeline horizontal scroll
- Mobile app version
- Social sharing
- Memory search functionality

---

Made with Love 💕

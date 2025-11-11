# 🚀 Quick Setup Guide for Sweet Memories

## Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including React, Framer Motion, and other dependencies.

## Step 2: Start the Development Server

```powershell
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

## Step 3: Explore the Website

- **Loading Screen**: Watch the animated rose bloom
- **Hero Section**: See the floating hearts and glowing title
- **Gallery**: Filter memories by tags and hover over cards
- **Timeline**: Scroll through the relationship milestones
- **Love Notes**: Navigate through the carousel of messages
- **Create Memory**: Fill out the form to see the success animation
- **Footer**: Notice the heartbeat animation

## Development Tips

### Hot Reload
The app automatically reloads when you save files. Just edit and save!

### Browser DevTools
Press `F12` to open developer tools and inspect elements.

### Component Locations
- Components are in `src/components/`
- Styles are in `src/styles/`
- App configuration is in `src/App.js`

## Making Changes

### Edit Memories in Gallery
Open `src/components/Gallery.js` and modify the `memories` array:

```javascript
const memories = [
  {
    id: 1,
    image: 'https://your-image-url.jpg',
    caption: 'Your caption',
    date: '2024-01-01',
    tag: 'First Date',
  },
  // Add more memories...
];
```

### Edit Timeline Milestones
Open `src/components/Timeline.js` and update the `milestones` array.

### Change Colors
Edit `src/styles/index.css` CSS variables section:

```css
:root {
  --primary-pink: #e65f76;    /* Change to your color */
  --highlight-pink: #ff8795;  /* Change to your color */
  /* ... more variables ... */
}
```

## Deployment

### Build for Production
```powershell
npm run build
```

This creates an optimized build in the `build/` folder.

### Deploy Options
- **Netlify**: Connect your GitHub repo for auto-deployment
- **Vercel**: One-click deployment from CLI: `npm install -g vercel && vercel`
- **GitHub Pages**: Deploy static build
- **Firebase**: Use Firebase Hosting

## Troubleshooting

### Port 3000 Already in Use
```powershell
npm start -- --port 3001
```

### Clear Node Modules
```powershell
Remove-Item -Recurse -Force .\node_modules
npm install
```

### Cache Issues
```powershell
npm cache clean --force
npm install
```

## Project Size
- Initial install: ~500MB (with node_modules)
- Build size: ~150KB (minified)

## Next Steps

1. ✅ Install dependencies
2. ✅ Start development server
3. ✅ Explore all components
4. ✅ Customize colors and content
5. ✅ Add your own photos and memories
6. ✅ Deploy to production

Happy coding! 💕

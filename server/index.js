// Simple Express API for Cloudinary uploads and Mongo-backed data
// Endpoints:
//   POST /api/upload           -> { image: dataUrl } -> { url, public_id, width, height }
//   GET  /api/memories         -> list all memories
//   POST /api/memories         -> create memory; uploads image to Cloudinary if base64 provided
//   PATCH/DELETE /api/memories/:id
//   GET  /api/guestbook        -> list entries
//   POST /api/guestbook        -> create entry

const express = require('express');
const cors = require('cors');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sweet_memories';
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// Configure Cloudinary if credentials exist
if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

let db; // shared connection
let client;

async function getDb() {
  if (db) return db;
  client = new MongoClient(MONGODB_URI);
  await client.connect();
  db = client.db();
  return db;
}

// Health
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Upload to Cloudinary
app.post('/api/upload', async (req, res) => {
  try {
    const { image, folder = 'sweet_memories' } = req.body || {};
    if (!image) return res.status(400).json({ error: 'image is required (base64 data URL or remote URL)' });

    if (!CLOUDINARY_CLOUD_NAME) {
      return res.status(500).json({ error: 'Cloudinary is not configured on the server' });
    }

    const uploaded = await cloudinary.uploader.upload(image, { folder });
    return res.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
    });
  } catch (err) {
    console.error('Upload error', err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Memories
app.get('/api/memories', async (req, res) => {
  try {
    const database = await getDb();
    const items = await database.collection('memories')
      .find({})
      .sort({ date: -1, createdAt: -1 })
      .toArray();
    res.json(items);
  } catch (err) {
    console.error('List memories error', err);
    res.status(500).json({ error: 'Failed to fetch memories' });
  }
});

app.post('/api/memories', async (req, res) => {
  try {
    const { title, date, description, tag, image } = req.body || {};
    if (!title || !date || !description || !tag) {
      return res.status(400).json({ error: 'title, date, description, tag are required' });
    }

    let imageUrl = null;
    let cloudinaryId = null;

    if (image) {
      if (!CLOUDINARY_CLOUD_NAME) {
        return res.status(500).json({ error: 'Cloudinary is not configured on the server' });
      }
      const uploaded = await cloudinary.uploader.upload(image, { folder: 'sweet_memories/memories' });
      imageUrl = uploaded.secure_url;
      cloudinaryId = uploaded.public_id;
    }

    const doc = {
      title,
      date,
      description,
      tag,
      image: imageUrl,
      cloudinaryId,
      favorite: false,
      createdAt: new Date(),
    };
    const database = await getDb();
    const result = await database.collection('memories').insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (err) {
    console.error('Create memory error', err);
    res.status(500).json({ error: 'Failed to create memory' });
  }
});

app.patch('/api/memories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body || {};
    const database = await getDb();
    await database.collection('memories').updateOne(
      { _id: new ObjectId(id) },
      { $set: { favorite: !!favorite } }
    );
    const updated = await database.collection('memories').findOne({ _id: new ObjectId(id) });
    res.json(updated);
  } catch (err) {
    console.error('Update memory error', err);
    res.status(500).json({ error: 'Failed to update memory' });
  }
});

app.delete('/api/memories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const database = await getDb();
    const existing = await database.collection('memories').findOne({ _id: new ObjectId(id) });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    await database.collection('memories').deleteOne({ _id: new ObjectId(id) });

    if (existing.cloudinaryId && CLOUDINARY_CLOUD_NAME) {
      try {
        await cloudinary.uploader.destroy(existing.cloudinaryId);
      } catch (e) {
        console.warn('Cloudinary destroy failed for', existing.cloudinaryId, e.message);
      }
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Delete memory error', err);
    res.status(500).json({ error: 'Failed to delete memory' });
  }
});

// Guestbook
app.get('/api/guestbook', async (req, res) => {
  try {
    const database = await getDb();
    const items = await database.collection('guestbook')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    res.json(items);
  } catch (err) {
    console.error('List guestbook error', err);
    res.status(500).json({ error: 'Failed to fetch guestbook entries' });
  }
});

app.post('/api/guestbook', async (req, res) => {
  try {
    const { name, message } = req.body || {};
    if (!name || !message) return res.status(400).json({ error: 'name and message are required' });
    const doc = { name, message, createdAt: new Date() };
    const database = await getDb();
    const result = await database.collection('guestbook').insertOne(doc);
    res.status(201).json({ _id: result.insertedId, ...doc });
  } catch (err) {
    console.error('Create guestbook error', err);
    res.status(500).json({ error: 'Failed to add guestbook entry' });
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'build');
  app.use(express.static(buildPath));
  // SPA fallback for non-API routes (Express 5 safe regex)
  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});

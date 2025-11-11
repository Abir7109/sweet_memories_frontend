// Shared MongoDB connection and Cloudinary config for Vercel Serverless Functions
const { MongoClient, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary').v2;

let cachedClient = global.__mongoClient;
let cachedDb = global.__mongoDb;

async function getDb() {
  if (cachedDb) return { db: cachedDb, client: cachedClient };
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sweet_memories';
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    cachedClient = client;
    cachedDb = db;
    global.__mongoClient = client;
    global.__mongoDb = db;
    return { db, client };
  } catch (err) {
    console.error('MongoDB connect error:', err);
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
}

function getCloudinary() {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
    return cloudinary;
  }
  return null;
}

module.exports = { getDb, getCloudinary, ObjectId };
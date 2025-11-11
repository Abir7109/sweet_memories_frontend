const { getDb } = require('./_db');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { db } = await getDb();
      const items = await db.collection('guestbook').find({}).sort({ createdAt: -1 }).toArray();
      return res.json(items);
    }

    if (req.method === 'POST') {
      const { name, message } = req.body || {};
      if (!(name && message)) return res.status(400).json({ error: 'name and message are required' });
      const doc = { name, message, createdAt: new Date() };
      const { db } = await getDb();
      const result = await db.collection('guestbook').insertOne(doc);
      return res.status(201).json({ _id: result.insertedId, ...doc });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('api/guestbook error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const clientPromise = require('./lib/mongodb');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('sweet_memories');
    const collection = db.collection('guestbook');

    // GET - Fetch all guestbook entries
    if (req.method === 'GET') {
      const entries = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: entries });
    }

    // POST - Create a new guestbook entry
    if (req.method === 'POST') {
      const { name, message } = req.body;

      if (!name || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Name and message are required' 
        });
      }

      const newEntry = {
        name,
        message,
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newEntry);
      
      return res.status(201).json({ 
        success: true, 
        data: { ...newEntry, _id: result.insertedId } 
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

const clientPromise = require('./lib/mongodb');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const client = await clientPromise;
    const db = client.db('sweet_memories');
    const collection = db.collection('memories');

    // GET - Fetch all memories
    if (req.method === 'GET') {
      const memories = await collection
        .find({})
        .sort({ date: -1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: memories });
    }

    // POST - Create a new memory
    if (req.method === 'POST') {
      const { title, description, date, image, category } = req.body;

      if (!title || !date) {
        return res.status(400).json({ 
          success: false, 
          error: 'Title and date are required' 
        });
      }

      const newMemory = {
        title,
        description: description || '',
        date: new Date(date),
        image: image || '',
        category: category || 'general',
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newMemory);
      
      return res.status(201).json({ 
        success: true, 
        data: { ...newMemory, _id: result.insertedId } 
      });
    }

    // DELETE - Delete a memory
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'Memory ID is required' 
        });
      }

      const { ObjectId } = require('mongodb');
      await collection.deleteOne({ _id: new ObjectId(id) });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Memory deleted successfully' 
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

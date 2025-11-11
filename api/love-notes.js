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
    const collection = db.collection('love_notes');

    // GET - Fetch all love notes
    if (req.method === 'GET') {
      const notes = await collection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      
      return res.status(200).json({ success: true, data: notes });
    }

    // POST - Create a new love note
    if (req.method === 'POST') {
      const { author, message, color } = req.body;

      if (!author || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Author and message are required' 
        });
      }

      const newNote = {
        author,
        message,
        color: color || '#ff9ec9',
        createdAt: new Date(),
      };

      const result = await collection.insertOne(newNote);
      
      return res.status(201).json({ 
        success: true, 
        data: { ...newNote, _id: result.insertedId } 
      });
    }

    // DELETE - Delete a love note
    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'Note ID is required' 
        });
      }

      const { ObjectId } = require('mongodb');
      await collection.deleteOne({ _id: new ObjectId(id) });
      
      return res.status(200).json({ 
        success: true, 
        message: 'Note deleted successfully' 
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

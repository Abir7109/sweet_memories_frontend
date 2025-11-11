const { getDb, getCloudinary } = require('../_db');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const { db } = await getDb();
      const items = await db.collection('memories').find({}).sort({ date: -1, createdAt: -1 }).toArray();
      return res.json(items);
    }

    if (req.method === 'POST') {
      const { title, date, description, tag, image } = req.body || {};
      if (!(title && date && description && tag)) {
        return res.status(400).json({ error: 'title, date, description, tag are required' });
      }
      let imageUrl = null;
      let cloudinaryId = null;
      if (image) {
        const cloud = getCloudinary();
        if (!cloud) return res.status(500).json({ error: 'Cloudinary not configured' });
        const uploaded = await cloud.uploader.upload(image, { folder: 'sweet_memories/memories' });
        imageUrl = uploaded.secure_url;
        cloudinaryId = uploaded.public_id;
      }
      const doc = { title, date, description, tag, image: imageUrl, cloudinaryId, favorite: false, createdAt: new Date() };
      const { db } = await getDb();
      const result = await db.collection('memories').insertOne(doc);
      return res.status(201).json({ _id: result.insertedId, ...doc });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('api/memories error', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

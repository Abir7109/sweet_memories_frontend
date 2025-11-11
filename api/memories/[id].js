const { getDb, getCloudinary, ObjectId } = require('../_db');

module.exports = async (req, res) => {
  const { id } = req.query || {};
  if (!id) return res.status(400).json({ error: 'id is required' });
  try {
    if (req.method === 'PATCH') {
      const { favorite } = req.body || {};
      const { db } = await getDb();
      await db.collection('memories').updateOne({ _id: new ObjectId(id) }, { $set: { favorite: !!favorite } });
      const updated = await db.collection('memories').findOne({ _id: new ObjectId(id) });
      return res.json(updated);
    }

    if (req.method === 'DELETE') {
      const { db } = await getDb();
      const existing = await db.collection('memories').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ error: 'Not found' });
      await db.collection('memories').deleteOne({ _id: new ObjectId(id) });
      if (existing.cloudinaryId) {
        try {
          const cloud = getCloudinary();
          if (cloud) await cloud.uploader.destroy(existing.cloudinaryId);
        } catch (e) {
          console.warn('Cloudinary destroy failed', e.message);
        }
      }
      return res.json({ ok: true });
    }

    res.setHeader('Allow', ['PATCH', 'DELETE']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('api/memories/[id] error', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
};

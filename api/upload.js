const { getCloudinary } = require('./_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  try {
    const { image, folder = 'sweet_memories' } = req.body || {};
    if (!image) return res.status(400).json({ error: 'image is required' });
    const cloud = getCloudinary();
    if (!cloud) return res.status(500).json({ error: 'Cloudinary not configured' });
    const uploaded = await cloud.uploader.upload(image, { folder });
    return res.json({
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
      width: uploaded.width,
      height: uploaded.height,
    });
  } catch (err) {
    console.error('api/upload error', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
};

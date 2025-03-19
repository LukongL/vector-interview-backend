const cloudinary = require('cloudinary').v2;
require('dotenv').config();

if (!process.env.CLOUDINARY_URL) {
    throw new Error('CLOUDINARY_URL environment variable not set');
  }

module.exports = { cloudinary };
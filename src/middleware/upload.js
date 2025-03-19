
const multer = require('multer');
const { cloudinary } = require('../config/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: process.env.MAX_VIDEO_SIZE },
  fileFilter: (req, file, cb) => {
    console.log('Detected MIME type:', file.mimetype);
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});

const uploadToCloudinary = async (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'video',
        folder: 'interview-videos',
        allowed_formats: ['mp4', 'mov', 'avi']
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    
    stream.end(buffer);
  });

};

module.exports = { upload, uploadToCloudinary };
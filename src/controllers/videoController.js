const Interview = require('../models/Interview');
const { uploadToCloudinary } = require('../middleware/upload');

const uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const interview = await Interview.findOne({
      _id: req.params.id,
      createdBy: req.userId
    });

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    
    // Update interview with video metadata
    interview.video = {
      public_id: result.public_id,
      url: result.secure_url,
      duration: Math.round(result.duration)
    };

    await interview.save();

    res.json({
      message: 'Video uploaded successfully',
      video: interview.video
    });
    
  } catch (err) {
    next(err);
  }
};

module.exports = { uploadVideo };
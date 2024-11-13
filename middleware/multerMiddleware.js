const multer = require('multer');
const path = require('path');

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Ensure the path is correctly resolved
  },
  filename: (req, file, cb) => {
    const filename = `image-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

// File Filter Configuration
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(null, false); // Reject the file
    return cb(new Error('Only png, jpg, and jpeg files are accepted'));
  }
};

// Multer Configuration
const multerConfig = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = multerConfig;

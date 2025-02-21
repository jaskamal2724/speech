import multer from "multer";

// Define allowed MIME types for audio files
const allowedMimeTypes = [
    "audio/mpeg",    // MP3
    "audio/wav",     // WAV
    "audio/ogg",     // OGG
    "audio/flac",    // FLAC
    "audio/aac",     // AAC
    "audio/mp4",     // MP4 Audio
    "audio/webm"     // WebM Audio
];

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder where uploaded files will be stored
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        // Keep the original filename for uploaded files
        cb(null, file.originalname);
    }
});

// Validate file type before uploading
const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept file if it matches the allowed MIME types
        cb(null, true);
    } else {
        // Reject file and return an error if the type is not allowed
        cb(new Error("Invalid file type. Only audio files are allowed"), false);
    }
};

// Initialize multer with storage configuration and file type validation
const upload = multer({ 
    storage: storage,
    // fileFilter: fileFilter // Apply file type validation
});

// Export the configured multer instance for use in routes
export default upload;

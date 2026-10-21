// middleware/upload.js
import multer from "multer";

// Memory storage (no local file save)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(png|jpe?g|webp|gif|svg\+xml)/i.test(file.mimetype);
    cb(ok ? null : new Error("Only image uploads are allowed"), ok);
  },
});

export default upload;

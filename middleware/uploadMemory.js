// import multer from "multer";

// export const uploadMemory = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
// });

import multer from "multer";

const storage = multer.memoryStorage();

const uploadMemory = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB (ইচ্ছেমতো)
});

export default uploadMemory;
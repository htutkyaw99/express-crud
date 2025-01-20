import multer from "multer";
import path from "path";

// console.log(import.meta.dirname);
// console.log(import.meta.filename);

const uploadDirectory = path.join(import.meta.dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

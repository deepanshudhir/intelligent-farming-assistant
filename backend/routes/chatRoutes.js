
const express = require("express");
const router = express.Router();
const multer = require("multer");

const { chatWithAI } = require("../controllers/chatController");
const auth = require("../middleware/auth");

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG and WEBP images are allowed."));
    }
  },
});

router.post("/", auth, upload.single("image"), chatWithAI);

module.exports = router;

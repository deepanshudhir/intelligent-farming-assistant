
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  savePrediction,
  getHistory,
  deletePrediction,
} = require("../controllers/predictionController");

router.post("/save", auth, savePrediction);
router.get("/history", auth, getHistory);
router.delete("/:id", auth, deletePrediction);

module.exports = router;

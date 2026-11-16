
const Prediction = require("../models/Prediction");

// Save a new prediction
exports.savePrediction = async (req, res) => {
  try {
    const { crop, disease, confidence } = req.body;

    if (!crop || !disease || confidence === undefined) {
      return res.status(400).json({
        success: false,
        message: "Crop, disease and confidence are required",
      });
    }

    const prediction = await Prediction.create({
      user: req.user.id,
      crop,
      disease,
      confidence,
    });

    res.status(201).json({
      success: true,
      message: "Prediction saved successfully",
      prediction,
    });
  } catch (error) {
    console.error("Save prediction error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save prediction",
    });
  }
};

// Get logged-in user's prediction history
exports.getHistory = async (req, res) => {
  try {
    const history = await Prediction.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Get history error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch prediction history",
    });
  }
};


exports.deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!prediction) {
      return res.status(404).json({
        success: false,
        message: "Prediction not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prediction deleted successfully",
    });

  } catch (error) {
    console.error("Delete prediction error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete prediction",
    });
  }
};

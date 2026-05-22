const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem");
const { protect } = require("../middleware/authMiddleware");

// POST /api/problems  — vendor posts a new problem (protected)
router.post("/", protect, async (req, res) => {
  try {
    const problem = new Problem({
      ...req.body,
      vendorId: req.user._id, // attach the logged-in vendor
    });
    await problem.save();
    res.status(201).json({ success: true, problem });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Post problem error:", error);
    res.status(500).json({ message: "Server error while posting problem" });
  }
});

// GET /api/problems  — all users can browse problems
router.get("/", async (req, res) => {
  try {
    const { category, difficulty, status } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (status) filter.status = status;

    const problems = await Problem.find(filter)
      .populate("vendorId", "fullName businessName email")
      .sort({ createdAt: -1 });

    res.json({ success: true, problems });
  } catch (error) {
    console.error("Get problems error:", error);
    res.status(500).json({ message: "Server error while fetching problems" });
  }
});

// GET /api/problems/:id  — single problem
router.get("/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate(
      "vendorId",
      "fullName businessName email",
    );
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/problems/vendor/me  — vendor's own problems (protected)
router.get("/vendor/me", protect, async (req, res) => {
  try {
    const problems = await Problem.find({ vendorId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, problems });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/problems/:id  — vendor edits their problem (protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const problem = await Problem.findOne({
      _id: req.params.id,
      vendorId: req.user._id,
    });
    if (!problem)
      return res
        .status(404)
        .json({ message: "Problem not found or not yours" });

    Object.assign(problem, req.body);
    await problem.save();
    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/problems/:id  — vendor deletes their problem (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      vendorId: req.user._id,
    });
    if (!problem)
      return res
        .status(404)
        .json({ message: "Problem not found or not yours" });
    res.json({ success: true, message: "Problem deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

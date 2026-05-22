const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// POST /api/payments/initiate  — vendor pays reward to winning student
router.post("/initiate", protect, async (req, res) => {
  try {
    const { problemId, solutionId, amount } = req.body;

    if (!problemId || !solutionId || !amount) {
      return res
        .status(400)
        .json({ message: "problemId, solutionId and amount are required" });
    }

    // TODO: integrate Stripe / Razorpay here
    // For now return a mock success so the frontend doesn't break
    return res.status(200).json({
      success: true,
      message: "Payment initiated (mock)",
      data: { problemId, solutionId, amount },
    });
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error during payment" });
  }
});

// GET /api/payments/history  — vendor's payment history
router.get("/history", protect, async (req, res) => {
  // TODO: fetch from Payment model once created
  res.json({ success: true, payments: [] });
});

module.exports = router;

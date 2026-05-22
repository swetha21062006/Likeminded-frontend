const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

// ── Helper: sign JWT and set HttpOnly cookie ──────────────────────────────
const sendToken = (res, user, statusCode = 200) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  const cookieOptions = {
    httpOnly: true, // JS cannot read it → XSS safe
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  };

  res.cookie("token", token, cookieOptions);

  return res.status(statusCode).json({
    success: true,
    token, // also send in body so frontend can store if needed
    user,
  });
};

// ── POST /api/auth/register ───────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      businessName,
      email,
      password,
      userType,
      university,
      industry,
    } = req.body;

    // Basic presence check (detailed validation is in the model)
    if (!email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Email, password and userType are required" });
    }

    // Check duplicate
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      fullName: fullName || businessName || "",
      businessName: businessName || "",
      email,
      password, // hashed by pre-save hook
      userType,
      university: university || "",
      industry: industry || "",
    });

    return sendToken(res, user, 201);
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(", ") });
    }
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ message: "Server error during registration" });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "No account found with this email" });
    }

    // Check userType matches (optional guard)
    if (userType && user.userType !== userType) {
      return res.status(403).json({
        message: `This email is registered as a ${user.userType}, not a ${userType}`,
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    return sendToken(res, user);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// ── POST /api/auth/logout ─────────────────────────────────────────────────
router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "strict" });
  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});

// ── GET /api/auth/me  (protected) ────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

module.exports = router;

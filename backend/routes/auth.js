const express = require("express");
const router = express.Router();          // ✅ make sure router is defined
const pool = require("../db");            // your MySQL connection
const bcrypt = require("bcryptjs");

// --- REGISTER ---
router.post("/register", async (req, res) => {
  const { name, email, password, role, faculty } = req.body;


  try {
    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // insert user into database
    await pool.query(
      "INSERT INTO users (name, email, password, role, faculty) VALUES (?, ?, ?, ?, ?)",
  [name, email, hashed, role, faculty]
    );

    res.json({ message: "User registered" });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// --- LOGIN ---
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // send back user data (later you can add JWT token here)
    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;

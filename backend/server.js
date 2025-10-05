const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const pool = require("./db");           
const authRoutes = require("./routes/auth"); 

const app = express();

// ✅ CORS FIX: allow frontend to connect
app.use(cors({
  origin: "http://localhost:3000", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Use auth routes
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.send("Backend running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

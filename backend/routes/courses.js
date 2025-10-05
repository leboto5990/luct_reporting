const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM courses");
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { courseName, courseCode, faculty } = req.body;
  await pool.query("INSERT INTO courses (courseName, courseCode, faculty) VALUES (?, ?, ?)", [
    courseName,
    courseCode,
    faculty,
  ]);
  res.json({ message: "Course added" });
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM courses WHERE id = ?", [req.params.id]);
  res.json({ message: "Course deleted" });
});

module.exports = router;

const pool = require("./db");
const bcrypt = require("bcryptjs");

(async () => {
  try {
    const hashed = await bcrypt.hash("1234", 10);
    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      ["Test User", "test@example.com", hashed, "lecturer"]
    );
    console.log("✅ User inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Error inserting user:", err);
    process.exit(1);
  }
})();

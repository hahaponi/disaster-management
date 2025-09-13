
// backend/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// Load safe places from JSON file
const safePlaces = JSON.parse(fs.readFileSync("safeplaces.json"));

// API endpoint to get safe places nearby
app.get("/api/safeplaces", (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude required" });
  }

  res.json(safePlaces);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

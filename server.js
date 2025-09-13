const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Sample safe places database
const safePlaces = [
  { id: 1, name: "NDRF Base Camp Ranchi", type: "Relief Camp", lat: 23.36, lon: 85.33 },
  { id: 2, name: "AIIMS Hospital Bhubaneswar", type: "Hospital", lat: 20.27, lon: 85.84 },
  { id: 3, name: "Community Shelter Kolkata", type: "Shelter", lat: 22.57, lon: 88.36 },
  { id: 4, name: "Relief Camp Patna", type: "Relief Camp", lat: 25.61, lon: 85.14 },
  { id: 5, name: "Guwahati Medical College", type: "Hospital", lat: 26.18, lon: 91.75 }
];

// Haversine formula for distance (km)
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// API endpoint
app.get("/api/safeplaces", (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: "lat and lon required" });

  const userLat = parseFloat(lat);
  const userLon = parseFloat(lon);

  const results = safePlaces.map(p => ({
    ...p,
    distance: haversine(userLat, userLon, p.lat, p.lon)
  }));

  // Sort by distance
  results.sort((a, b) => a.distance - b.distance);

  res.json(results);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
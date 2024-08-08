// server.js
import express from "express";
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = "LA_TUA_CHIAVE_API_GOOGLE_MAPS"; // Imposta la chiave API come variabile di ambiente o qui direttamente.

app.get("/api/maps-key", (req, res) => {
  res.json({ key: API_KEY });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let sensorData = {
  moisture: 45,
  temperature: 28,
  pump: "OFF",
  threshold: 35
};

app.get("/api/data", (req, res) => {
  res.json(sensorData);
});

app.post("/api/pump", (req, res) => {
  sensorData.pump = req.body.status;
  res.json({ pump: sensorData.pump });
});

app.post("/api/threshold", (req, res) => {
  sensorData.threshold = req.body.threshold;
  res.json({ threshold: sensorData.threshold });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

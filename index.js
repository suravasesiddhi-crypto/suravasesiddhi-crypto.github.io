const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// fake sensor data (for now)
let sensorData = {
  moisture: 45,
  temperature: 28,
  pump: "OFF",
  threshold: 35
};

// simulate sensor changes every 3 seconds
setInterval(() => {
  // random moisture change
  sensorData.moisture += Math.floor(Math.random() * 5 - 2);

  // keep moisture between 0 and 100
  if (sensorData.moisture < 0) sensorData.moisture = 0;
  if (sensorData.moisture > 100) sensorData.moisture = 100;

  // automatic pump logic
  if (sensorData.moisture < sensorData.threshold) {
    sensorData.pump = "ON";
  } else {
    sensorData.pump = "OFF";
  }

  console.log("Updated sensor data:", sensorData);
}, 3000);


app.get("/api/data", (req, res) => {
  res.json(sensorData);
});

app.post("/api/pump", (req, res) => {
  const { status } = req.body;
  sensorData.pump = status;
  res.json({ message: "Pump status updated", pump: status });
});

app.post("/api/threshold", (req, res) => {
  const { threshold } = req.body;
  sensorData.threshold = threshold;
  res.json({ message: "Threshold updated", threshold });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

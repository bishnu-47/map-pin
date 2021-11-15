import express from "express";
import Pin from '../models/Pin.js'
const router = express.Router();

// @desc    create pin
// @path    POST "/api/pin"
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);

  try {
    const savedPin = await newPin.save();
    res.status(201).json(savedPin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @desc    get all pins
// @path    GET "/api/pin"
router.get("/", async (req, res) => {
  try {
    const allPins = await Pin.find();
    res.status(200).json(allPins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");

router.get("/", async (req, res) => {
  try {
    res.json(await Reserva.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevo = new Reserva(req.body);
    res.status(201).json(await nuevo.save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(
      await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

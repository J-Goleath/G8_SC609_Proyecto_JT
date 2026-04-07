const express = require("express");
const router = express.Router();
const Promocion = require("../models/Promocion");

router.get("/", async (req, res) => {
  try {
    res.json(await Promocion.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await new Promocion(req.body).save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(
      await Promocion.findByIdAndUpdate(req.params.id, req.body, { new: true }),
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Promocion.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

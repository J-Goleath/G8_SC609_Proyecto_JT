const express = require("express");
const router = express.Router();
const Huesped = require("../models/Huesped");

router.get("/", async (req, res) => {
  try {
    const datos = await Huesped.find();
    res.json(datos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevo = new Huesped(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Huesped.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Huesped.findByIdAndDelete(req.params.id);
    res.json({ message: "Eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

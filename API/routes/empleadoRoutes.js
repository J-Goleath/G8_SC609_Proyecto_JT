const express = require("express");
const router = express.Router();
const Empleado = require("../models/Empleado");

router.get("/", async (req, res) => {
  try {
    res.json(await Empleado.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await new Empleado(req.body).save());
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    res.json(
      await Empleado.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      )
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Empleado.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const mongoose = require("mongoose");
const transporteSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    tipo: { type: String, required: true },
    capacidad: { type: Number, required: true },
    disponible: { type: Boolean, required: true },
    conductor: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Transporte", transporteSchema, "transportes");

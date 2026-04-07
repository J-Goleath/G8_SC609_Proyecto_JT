const mongoose = require("mongoose");
const habitacionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    numero: { type: Number, required: true },
    tipo: { type: String, required: true },
    precio_noche: { type: Number, required: true },
    disponibilidad: { type: Boolean, required: true },
    piso: { type: Number, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Habitacion", habitacionSchema, "habitaciones");

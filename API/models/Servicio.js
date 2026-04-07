const mongoose = require("mongoose");
const servicioSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    costo: { type: Number, required: true },
    descripcion: { type: String, required: true },
    disponibilidad: { type: Boolean, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Servicio", servicioSchema, "servicios");

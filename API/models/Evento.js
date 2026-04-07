const mongoose = require("mongoose");
const eventoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    fecha: { type: String, required: true },
    sede_id: { type: String, required: true },
    capacidad: { type: Number, required: true },
    tipo: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Evento", eventoSchema, "eventos");

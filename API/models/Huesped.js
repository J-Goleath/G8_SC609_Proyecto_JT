const mongoose = require("mongoose");
const huespedSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    documento: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    pais_origen: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Huesped", huespedSchema, "huespedes");

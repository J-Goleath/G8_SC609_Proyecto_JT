const mongoose = require("mongoose");
const sedeSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    ciudad: { type: String, required: true },
    telefono: { type: String, required: true },
    categoria: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Sede", sedeSchema, "sedes");

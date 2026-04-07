const mongoose = require("mongoose");
const mantenimientoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    area: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true },
    empleado_id: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model(
  "Mantenimiento",
  mantenimientoSchema,
  "mantenimiento",
);

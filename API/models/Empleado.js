const mongoose = require("mongoose");
const empleadoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    cargo: { type: String, required: true },
    horario: { type: String, required: true },
    contacto: { type: String, required: true },
    sueldo: { type: Number, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Empleado", empleadoSchema, "empleados");

const mongoose = require("mongoose");
const proveedorSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    servicio: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Proveedor", proveedorSchema, "proveedores");

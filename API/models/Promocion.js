const mongoose = require("mongoose");
const promocionSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    porcentaje_descuento: { type: Number, required: true },
    fecha_inicio: { type: String, required: true },
    fecha_fin: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Promocion", promocionSchema, "promociones");

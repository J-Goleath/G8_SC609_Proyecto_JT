const mongoose = require("mongoose");
const reservaSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    huesped_id: { type: String, required: true },
    habitacion_id: { type: String, required: true },
    fecha_ingreso: { type: String, required: true },
    fecha_salida: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Reserva", reservaSchema, "reservas");

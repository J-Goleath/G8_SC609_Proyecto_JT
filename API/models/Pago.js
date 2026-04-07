const mongoose = require("mongoose");
const pagoSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    reserva_id: { type: String, required: true },
    monto: { type: Number, required: true },
    metodo: { type: String, required: true },
    fecha: { type: String, required: true },
    estado: { type: String, required: true },
  },
  { versionKey: false },
);
module.exports = mongoose.model("Pago", pagoSchema, "pagos");

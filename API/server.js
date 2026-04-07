const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión Exitosa a HotelDB'))
    .catch(err => console.error(err));

app.use('/api/huespedes', require('./routes/huespedRoutes'));
app.use('/api/habitaciones', require('./routes/habitacionRoutes'));
app.use('/api/reservas', require('./routes/reservaRoutes'));
app.use('/api/pagos', require('./routes/pagoRoutes'));
app.use('/api/servicios', require('./routes/servicioRoutes'));
app.use('/api/empleados', require('./routes/empleadoRoutes'));
app.use('/api/promociones', require('./routes/promocionRoutes'));
app.use('/api/sedes', require('./routes/sedeRoutes'));
app.use('/api/eventos', require('./routes/eventoRoutes'));
app.use('/api/transportes', require('./routes/transporteRoutes'));
app.use('/api/proveedores', require('./routes/proveedorRoutes'));
app.use('/api/mantenimiento', require('./routes/mantenimientoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
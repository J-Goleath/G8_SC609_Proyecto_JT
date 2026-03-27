const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado exitosamente')) 
    .catch(err => console.error('Error de conexión:', err));

const rutaCalificaciones = require('./routes/calificacionRutas');
app.use('/api/calificaciones', rutaCalificaciones);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
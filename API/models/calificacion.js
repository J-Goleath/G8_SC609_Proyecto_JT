const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({
    NombreEstudiante: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(v);
            }
        }
    },
    Cuatrimestre: { type: Number, required: true, index: true },
    NotaMatematicas: { type: Number, required: true },
    NotaCiencias: { type: Number, required: true },
    NotaLiteratura: { type: Number, required: true },
    NotaCivica: { type: Number, required: true },
    Condicion: { 
        type: String, 
        required: true, 
        enum: ['Aprobado', 'Ampliacion', 'Reprobado']
    }
});

module.exports = mongoose.model('Calificacion', calificacionSchema, 'Calificaciones');
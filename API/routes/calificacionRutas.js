const express = require('express');
const router = express.Router();
const Calificacion = require('../models/calificacion');

router.post('/', async (req, res) => {
    try {
        const nueva = new Calificacion(req.body);
        const guardado = await nueva.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const actualizado = await Calificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
    const eliminado = await Calificacion.findByIdAndDelete(req.params.id);
    res.json(eliminado);
});

router.get('/aprobadas/:estudiante', async (req, res) => {
    const datos = await Calificacion.find({ NombreEstudiante: req.params.estudiante, Condicion: 'Aprobado' });
    res.json(datos);
});

router.get('/cuatrimestre/:cuatri/nombre/:nombre', async (req, res) => {
    const datos = await Calificacion.find({ 
        Cuatrimestre: parseInt(req.params.cuatri),
        NombreEstudiante: { $regex: new RegExp('^' + req.params.nombre, 'i') } 
    });
    res.json(datos);
});

router.get('/rango-civica', async (req, res) => {
    const datos = await Calificacion.find({ NotaCivica: { $gte: 60, $lt: 70 } });
    res.json(datos);
});

router.get('/promedio/:cuatri', async (req, res) => {
    const promedio = await Calificacion.aggregate([
        { $match: { Cuatrimestre: parseInt(req.params.cuatri) } },
        { $group: {
            _id: "$Cuatrimestre",
            Mate: { $avg: "$NotaMatematicas" },
            Ciencias: { $avg: "$NotaCiencias" },
            Literatura: { $avg: "$NotaLiteratura" },
            Civica: { $avg: "$NotaCivica" }
        }}
    ]);
    res.json(promedio);
});

router.get('/nota-alta/:estudiante/:cuatri', async (req, res) => {
    const registro = await Calificacion.findOne({ 
        NombreEstudiante: req.params.estudiante, 
        Cuatrimestre: parseInt(req.params.cuatri) 
    });
    if (registro) {
        const notas = [registro.NotaMatematicas, registro.NotaCiencias, registro.NotaLiteratura, registro.NotaCivica];
        res.json({ notaMasAlta: Math.max(...notas) });
    } else {
        res.status(404).json({ message: "No encontrado" });
    }
});

module.exports = router;
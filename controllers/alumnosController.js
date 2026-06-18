const Alumno = require("../models/Alumno");

const getAlumnos = async (req, res) => {
    try {
        const resultado = await Alumno.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createAlumno = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const resultado = await Alumno.create(nombre, email);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
    getAlumnos,
    createAlumno,
};
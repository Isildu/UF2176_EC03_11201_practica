const Matricula = require("../models/Matricula");

const getMatriculas = async (req, res) => {
    try {
        const resultado = await Matricula.findAll();
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const createMatricula = async (req, res) => {
    try {
        const { alumno_id, curso_id, fecha_matricula } = req.body;
        const resultado = await Matricula.create(alumno_id, curso_id, fecha_matricula);
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
    getMatriculas,
    createMatricula,
};
const pool = require('../config/db');

// 1. Consulta básica con WHERE: Profesores por edad
const profesoresPorEdad = async (req, res) => {
    try {
        const { edad } = req.query;

        if (!edad) {
            return res.status(400).json({ mensaje: 'El parámetro edad es requerido' });
        }

        const resultado = await pool.query(
            'SELECT * FROM profesores WHERE edad = $1',
            [edad]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: `No se encontraron profesores con edad ${edad}`
            });
        }
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

//2. Consulta con WHERE doble condicional
const profesoresPorRangoEdad = async (req, res) => {
    try {
        const { min, max } = req.query;
        
        if (!min || !max) {
            return res.status(400).json({ mensaje: 'min y max son requeridos' });
        }
        
        
        const resultado = await pool.query(
            'SELECT * FROM profesores WHERE edad >= $1 AND edad <= $2',
            [min, max]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: `No se encontraron profesores con edades entre ${min} y ${max}`
            });
        }
        
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

module.exports = {
    profesoresPorEdad,
    profesoresPorRangoEdad
};
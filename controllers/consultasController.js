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

// 3. Consulta con subconsulta matriculas
const cursosTopMatriculados = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT 
                c.curso_id,
                c.nombre,
                COUNT(m.matricula_id) AS total_matriculas
            FROM curso c
            LEFT JOIN matriculas m ON c.curso_id = m.curso_id
            GROUP BY c.curso_id, c.nombre
            HAVING COUNT(m.matricula_id) = (
                SELECT MAX(total) 
                FROM (
                    SELECT COUNT(m2.matricula_id) AS total
                    FROM curso c2
                    LEFT JOIN matriculas m2 ON c2.curso_id = m2.curso_id
                    GROUP BY c2.curso_id
                ) AS conteos
            )
        `);
        
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
// 4. Consulta con JOIN: Matrículas con nombre del alumno y nombre del curso
const matriculasAlumnoCurso = async (req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT 
                a.nombre AS alumno_nombre,
                c.nombre AS curso_nombre
            FROM matriculas m
            INNER JOIN alumnos a ON m.alumno_id = a.alumno_id
            INNER JOIN curso c ON m.curso_id = c.curso_id
        `);
        
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};
module.exports = {
    profesoresPorEdad,
    profesoresPorRangoEdad,
    cursosTopMatriculados,
    matriculasAlumnoCurso
};
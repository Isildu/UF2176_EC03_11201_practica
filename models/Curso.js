const pool = require("../config/db");

const Curso = {
    findAll: () =>
        pool.query(`
            SELECT c.*, p.nombre AS profesor
            FROM curso c
            INNER JOIN profesores p ON c.profesor_id = p.profesor_id
        `),

    create: (nombre, horas, profesor_id) =>
        pool.query(
            `INSERT INTO curso (nombre, horas, profesor_id)
             VALUES ($1, $2, $3) RETURNING *`,
            [nombre, horas, profesor_id]
        ),
};

module.exports = Curso;

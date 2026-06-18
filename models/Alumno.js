const pool = require("../config/db");

const Alumno = {
    findAll: () =>
        pool.query("SELECT * FROM alumnos ORDER BY alumno_id"),

    create: (nombre, email) =>
        pool.query(
            `INSERT INTO alumnos (nombre, email)
             VALUES ($1, $2) RETURNING *`,
            [nombre, email]
        ),
};

module.exports = Alumno;

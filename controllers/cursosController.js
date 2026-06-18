const pool = require("../config/db");

const getCursos = async(req,res)=>{

    const resultado = await pool.query(`
        SELECT c.*,
               p.nombre as profesor
        FROM curso c
        INNER JOIN profesores p
        ON c.profesor_id=p.profesor_id
    `);

    res.json(resultado.rows);
};

const createCurso = async(req,res)=>{

    const {
        nombre,
        horas,
        profesor_id
    } = req.body;

    const resultado = await pool.query(
        `INSERT INTO curso
         (nombre,horas,profesor_id)
         VALUES($1,$2,$3)
         RETURNING *`,
        [nombre,horas,profesor_id]
    );

    res.status(201).json(resultado.rows[0]);
};

module.exports={
    getCursos,
    createCurso
};
const pool=require("../config/db");

const getMatriculas=async(req,res)=>{

    const resultado=await pool.query(`
        SELECT
            m.matricula_id,
            a.nombre as alumno,
            c.nombre as curso,
            m.fecha_matricula
        FROM matriculas m
        INNER JOIN alumnos a
        ON a.alumno_id=m.alumno_id
        INNER JOIN curso c
        ON c.curso_id=m.curso_id
        ORDER BY m.matricula_id
    `);

    res.json(resultado.rows);
};

const createMatricula=async(req,res)=>{

    const {
        alumno_id,
        curso_id,
        fecha_matricula
    }=req.body;

    const resultado=await pool.query(
        `INSERT INTO matriculas
        (alumno_id,curso_id,fecha_matricula)
        VALUES($1,$2,$3)
        RETURNING *`,
        [alumno_id,curso_id,fecha_matricula]
    );

    res.status(201).json(resultado.rows[0]);
};

module.exports={
    getMatriculas,
    createMatricula
};
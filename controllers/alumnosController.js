const pool = require("../config/db");

const getAlumnos = async(req,res)=>{
    const resultado = await pool.query(
        "SELECT * FROM alumnos ORDER BY alumno_id"
    );

    res.json(resultado.rows);
};

const createAlumno = async(req,res)=>{

    const {nombre,email}=req.body;

    const resultado = await pool.query(
        `INSERT INTO alumnos(nombre,email)
         VALUES($1,$2)
         RETURNING *`,
        [nombre,email]
    );

    res.status(201).json(resultado.rows[0]);
};

module.exports={
    getAlumnos,
    createAlumno
};
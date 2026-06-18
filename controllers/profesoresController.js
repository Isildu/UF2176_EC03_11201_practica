const pool = require("../config/db");

const getProfesores = async(req,res)=>{
    try{
        const resultado = await pool.query(`
            SELECT p.*,
                   e.nombre as especialidad
            FROM profesores p
            LEFT JOIN especialidad e
            ON p.especialidad_id=e.especialidad_id
            ORDER BY profesor_id
        `);

        res.json(resultado.rows);

    }catch(error){
        res.status(500).json(error.message);
    }
};

const getProfesor = async(req,res)=>{
    try{

        const {id}=req.params;

        const resultado=await pool.query(
            "SELECT * FROM profesores WHERE profesor_id=$1",
            [id]
        );

        res.json(resultado.rows[0]);

    }catch(error){
        res.status(500).json(error.message);
    }
};

const createProfesor = async(req,res)=>{
    try{

        const {
            nombre,
            edad,
            especialidad_id
        }=req.body;

        const resultado=await pool.query(
            `INSERT INTO profesores
            (nombre,edad,especialidad_id)
            VALUES($1,$2,$3)
            RETURNING *`,
            [nombre,edad,especialidad_id]
        );

        res.status(201).json(resultado.rows[0]);

    }catch(error){
        res.status(500).json(error.message);
    }
};

const updateProfesor = async(req,res)=>{
    try{

        const {id}=req.params;

        const {
            nombre,
            edad,
            especialidad_id
        }=req.body;

        const resultado=await pool.query(
            `UPDATE profesores
             SET nombre=$1,
                 edad=$2,
                 especialidad_id=$3
             WHERE profesor_id=$4
             RETURNING *`,
            [nombre,edad,especialidad_id,id]
        );

        res.json(resultado.rows[0]);

    }catch(error){
        res.status(500).json(error.message);
    }
};

const deleteProfesor = async(req,res)=>{
    try{

        const {id}=req.params;

        await pool.query(
            "DELETE FROM profesores WHERE profesor_id=$1",
            [id]
        );

        res.json({
            mensaje:"Profesor eliminado"
        });

    }catch(error){
        res.status(500).json(error.message);
    }
};

module.exports={
    getProfesores,
    getProfesor,
    createProfesor,
    updateProfesor,
    deleteProfesor
};
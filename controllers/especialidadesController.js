const pool=require("../config/db");

const getEspecialidades=async(req,res)=>{

    const resultado=await pool.query(`
        SELECT e.*,
               p.nombre as profesor
        FROM especialidad e
        LEFT JOIN profesores p
        ON e.profesor_id=p.profesor_id
    `);

    res.json(resultado.rows);
};

module.exports={
    getEspecialidades
};
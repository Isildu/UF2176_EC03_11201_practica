const router = require("express").Router();

const {
    getAlumnos,
    createAlumno
}=require("../controllers/alumnosController");

router.get("/",getAlumnos);

router.post("/",createAlumno);

module.exports=router;
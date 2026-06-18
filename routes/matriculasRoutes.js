const router=require("express").Router();

const {
    getMatriculas,
    createMatricula
}=require("../controllers/matriculasController");

router.get("/",getMatriculas);

router.post("/",createMatricula);

module.exports=router;  
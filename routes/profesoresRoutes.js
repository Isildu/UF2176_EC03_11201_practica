const router = require("express").Router();

const {
    getProfesores,
    getProfesor,
    createProfesor,
    updateProfesor,
    deleteProfesor,
} = require("../controllers/profesoresController");
const authMiddleware = require("../controllers/middlewares/authMiddleware");
const handleValidation = require("../controllers/middlewares/handleValidation");
const profesorValidator = require("../controllers/middlewares/validators/profesorValidator");

router.get("/", getProfesores);
router.get("/:id", authMiddleware, getProfesor);
router.post("/", authMiddleware, handleValidation, profesorValidator, createProfesor);
router.put("/:id", authMiddleware, handleValidation, profesorValidator, updateProfesor);
router.delete("/:id", authMiddleware, deleteProfesor);
module.exports = router;
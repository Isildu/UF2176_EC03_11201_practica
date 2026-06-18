const router = require("express").Router();

const {
    getProfesores,
    getProfesor,
    createProfesor,
    updateProfesor,
    deleteProfesor
} = require("../controllers/profesoresController");
const authMiddleware = require("../controllers/middlewares/authMiddleware");

router.get("/", authMiddleware, getProfesores);
router.get("/:id", authMiddleware, getProfesor);

router.post("/", authMiddleware, createProfesor);

router.put("/:id", authMiddleware, updateProfesor);

router.delete("/:id", authMiddleware, deleteProfesor);

module.exports = router;
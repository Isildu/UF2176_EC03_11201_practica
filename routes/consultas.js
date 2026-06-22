const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultasController');

// ✅ Correcto - usando el controlador importado
router.get('/profesores/por-edad', consultasController.profesoresPorEdad);

// Aquí irán el resto de endpoints
router.get('/profesores/rango', consultasController.profesoresPorRangoEdad);
router.get('/cursos/top-matriculados', consultasController.cursosTopMatriculados);
router.get('/matriculas/alumno-curso', consultasController.matriculasAlumnoCurso);
router.get('/profesores/curso-especialidad', consultasController.profesoresCursoEspecialidad);
router.get('/matriculas/total-por-curso', consultasController.totalMatriculasPorCurso);
router.get('/matriculas/cursos-con-minimo', consultasController.cursosConMinimoMatriculas);
module.exports = router;
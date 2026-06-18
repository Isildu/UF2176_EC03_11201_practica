const { body } = require("express-validator");

const cursoValidator = [
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .trim(),
];

module.exports = cursoValidator;

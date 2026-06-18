module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const configuredToken = process.env.API_TOKEN;

    // If no token is configured, keep requests open to avoid breaking local development.
    if (!configuredToken) {
        return next();
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    if (token !== configuredToken) {
        return res.status(401).json({ mensaje: "Token inválido" });
    }

    return next();
};

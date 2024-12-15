import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // On récupère le token dans l'en-tête Authorization
    console.log("Token reçu :", token);
    if (!token) return res.status(403).json({ error: "Token requis" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token invalide" });

        req.user = user; // On stocke les informations de l'utilisateur
        next();
    });
};

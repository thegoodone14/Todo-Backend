import db from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    console.log(req.body); // Affiche le contenu de req.body pour vérifier les données
    const { Pseudo, Mail, Password, isAdmin } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(Password, salt);

    db.query(
        "INSERT INTO users (ID_User, Pseudo, Mail, Password, isAdmin) VALUES (UUID(), ?, ?, ?, ?)",
        [Pseudo, Mail, hashedPassword, isAdmin || 0],
        (err) => {
            if (err) {
                console.error("Erreur MySQL : ", err); // Affiche l'erreur dans la console
                return res.status(500).json({ error: `Erreur lors de l'inscription: ${err.message}` });
            }
            res.status(201).json({ message: "Utilisateur créé avec succès" });
        }
    );
};

export const login = (req, res) => {
    const { Mail, Password } = req.body;

    // Vérifier si l'utilisateur existe
    db.query("SELECT * FROM users WHERE Mail = ?", [Mail], (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur de connexion" });
        if (results.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const user = results[0];

        // Vérification du mot de passe
        const isPasswordValid = bcrypt.compareSync(Password, user.Password);
        if (!isPasswordValid) return res.status(401).json({ error: "Mot de passe incorrect" });

        // Création du token JWT
        const token = jwt.sign({ ID_User: user.ID_User }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Connexion réussie", token });
    });
};
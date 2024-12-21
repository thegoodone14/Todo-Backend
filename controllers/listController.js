import db from "../config/database.js";

export const getOrCreateList = (req, res) => {
    const { ID_User } = req.user;

    db.query('SELECT * FROM "List" WHERE "ID_User" = $1', [ID_User], (err, results) => {
        if (err) {
            console.error("Erreur de vérification liste:", err);
            return res.status(500).json({ error: "Erreur lors de la vérification de la liste" });
        }

        if (results.rows && results.rows.length > 0) {
            // Si une liste existe, la retourner
            return res.status(200).json(results.rows[0]);
        } else {
            // Sinon, créer une nouvelle liste
            const defaultListName = "Ma Liste";
            db.query(
                'INSERT INTO "List" ("name_List", "ID_User") VALUES ($1, $2) RETURNING *',
                [defaultListName, ID_User],
                (err, result) => {
                    if (err) {
                        console.error("Erreur création liste:", err);
                        return res.status(500).json({ error: "Erreur lors de la création de la liste" });
                    }
                    return res.status(201).json(result.rows[0]);
                }
            );
        }
    });
};
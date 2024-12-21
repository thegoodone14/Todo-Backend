import db from "../config/database.js";

export const getOrCreateList = async (req, res) => {
    const { ID_User } = req.user;

    try {
        // Vérifier si une liste existe déjà
        const existingList = await db.query(
            'SELECT * FROM "list" WHERE "ID_User" = $1',
            [ID_User]
        );

        if (existingList.rows && existingList.rows.length > 0) {
            return res.status(200).json(existingList.rows[0]);
        }

        // Créer une nouvelle liste si aucune n'existe
        const defaultListName = "Ma Liste";
        const newList = await db.query(
            'INSERT INTO "list" ("name_List", "ID_User") VALUES ($1, $2) RETURNING *',
            [defaultListName, ID_User]
        );

        return res.status(201).json(newList.rows[0]);
    } catch (error) {
        console.error("Erreur dans getOrCreateList:", error);
        return res.status(500).json({ 
            error: "Erreur lors de l'opération sur la liste",
            details: error.message
        });
    }
};
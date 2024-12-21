import db from "../config/database.js";

export const addTaskToUniqueList = async (req, res) => {
    const { Description, isDone } = req.body;
    const { ID_User } = req.user;

    try {
        // Utilisation de guillemets doubles pour les noms de colonnes et de tables
        const listResult = await db.query(
            'SELECT "ID_List" FROM "list" WHERE "ID_User" = $1',
            [ID_User]
        );

        if (listResult.rows.length === 0) {
            return res.status(400).json({ error: "Aucune liste trouvée pour cet utilisateur" });
        }

        const ID_List = listResult.rows[0].ID_List;

        await db.query(
            'INSERT INTO "task" ("Description", "isDone", "ID_List") VALUES ($1, $2, $3)',
            [Description, isDone || false, ID_List]
        );

        res.status(201).json({ message: "Tâche ajoutée avec succès" });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
    }
};

export const getTasksByListId = async (req, res) => {
    const { ID_List } = req.params;

    if (!ID_List) {
        return res.status(400).json({ error: "ID_List est requis" });
    }

    try {
        const result = await db.query(
            'SELECT * FROM "task" WHERE "ID_List" = $1',
            [ID_List]
        );

        console.log("Tâches récupérées :", result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
    }
};

export const toggleTaskStatus = async (req, res) => {
    const { Id_Task } = req.params;
    const { isDone } = req.body;

    console.log("Id_Task :", Id_Task, "isDone :", isDone);

    if (!Id_Task || typeof isDone !== 'boolean') {
        return res.status(400).json({ error: "Id_Task et isDone sont requis" });
    }

    try {
        await db.query(
            'UPDATE "task" SET "isDone" = $1 WHERE "ID_Task" = $2',
            [isDone, Id_Task]
        );

        res.status(200).json({ message: "Tâche mise à jour avec succès" });
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la tâche" });
    }
};

export const deleteTask = async (req, res) => {
    const { ID_Task } = req.params;

    if (!ID_Task) {
        return res.status(400).json({ error: "ID_Task est requis" });
    }

    try {
        await db.query(
            'DELETE FROM "task" WHERE "ID_Task" = $1',
            [ID_Task]
        );

        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
        console.error("Erreur SQL :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
    }
};
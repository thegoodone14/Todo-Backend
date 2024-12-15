import db from "../config/database.js";


export const addTaskToUniqueList = (req, res) => {
    const { Description, isDone } = req.body;
    const { ID_User } = req.user;

    db.query("SELECT ID_List FROM List WHERE ID_User = ?", [ID_User], (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la récupération de la liste" });

        if (results.length === 0) {
            return res.status(400).json({ error: "Aucune liste trouvée pour cet utilisateur" });
        }

        const ID_List = results[0].ID_List;

        db.query(
            "INSERT INTO Task (Description, isDone, ID_List) VALUES (?, ?, ?)",
            [Description, isDone || false, ID_List],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
                res.status(201).json({ message: "Tâche ajoutée avec succès" });
            }
        );
    });
};

export const getTasksByListId = (req, res) => {
    const { ID_List } = req.params;

    if (!ID_List) {
        return res.status(400).json({ error: "ID_List est requis" });
    }

    db.query(
        "SELECT * FROM Task WHERE ID_List = ?",
        [ID_List],
        (err, results) => {
            if (err) {
                console.error("Erreur SQL :", err);
                return res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
            }

            console.log("Tâches récupérées :", results); // Debug
            res.status(200).json(results);
        }
    );
};

export const toggleTaskStatus = (req, res) => {
    const { Id_Task } = req.params;
    const { isDone } = req.body;

    console.log("Id_Task :", Id_Task, "isDone :", isDone); // Debug

    if (!Id_Task || typeof isDone !== 'boolean') {
        return res.status(400).json({ error: "Id_Task et isDone sont requis" });
    }

    db.query(
        "UPDATE Task SET isDone = ? WHERE ID_Task = ?",
        [isDone, Id_Task],
        (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);
                return res.status(500).json({ error: "Erreur lors de la mise à jour de la tâche" });
            }

            res.status(200).json({ message: "Tâche mise à jour avec succès" });
        }
    );
};

export const deleteTask = (req, res) => {
    const { ID_Task } = req.params;

    if (!ID_Task) {
        return res.status(400).json({ error: "ID_Task est requis" });
    }

    db.query(
        "DELETE FROM Task WHERE ID_Task = ?",
        [ID_Task],
        (err, result) => {
            if (err) {
                console.error("Erreur SQL :", err);
                return res.status(500).son({ error: "Erreur lors de la suppression de la tâche "});
            }

            res.status(200).json({message: "Tâche supprimée avec succès"});
        }
    );
};
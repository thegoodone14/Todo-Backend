import db from "../config/database.js";

export const getOrCreateList = (req, res) => {
    const { ID_User } = req.user;

    db.query("SELECT * FROM List WHERE ID_User = ?", [ID_User], (err, results) => {
        if (err) return res.status(500).json({ error: "Erreur lors de la vérification de la liste" });

        if (results.length > 0) {
            // Si une liste existe, la retourner
            return res.status(200).json(results[0]);
        } else {
            // Sinon, créer une nouvelle liste
            const defaultListName = "Ma Liste";
            db.query(
                "INSERT INTO List (name_List, ID_User) VALUES (?, ?)",
                [defaultListName, ID_User],
                (err, result) => {
                    if (err) return res.status(500).json({ error: "Erreur lors de la création de la liste" });

                    // Retourner la nouvelle liste
                    db.query("SELECT * FROM List WHERE ID_List = ?", [result.insertId], (err, newResults) => {
                        if (err) return res.status(500).json({ error: "Erreur lors de la récupération de la nouvelle liste" });
                        return res.status(201).json(newResults[0]);
                    });
                }
            );
        }
    });
};


    export const addTask = (req, res) => {
        console.log("Requête reçue pour ajouter une tâche :", req.body);
        const { Description, isDone, ID_List } = req.body;
    
        if (!ID_List || !Description) {
            return res.status(400).json({ error: "ID_List et Description sont requis" });
        }
    
        db.query(
            "INSERT INTO Task (Description, isDone, ID_List) VALUES (?, ?, ?)",
            [Description, isDone || false, ID_List],
            (err) => {
                if (err) return res.status(500).json({ error: "Erreur lors de l'ajout de la tâche" });
                res.status(201).json({ message: "Tâche ajoutée avec succès" });
            }
        );
    };
    



    


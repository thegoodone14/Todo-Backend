import mysql from "mysql2"
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Connexion à la base de données
db.connect(function(err) {
    if(err)throw err
    console.log("Parfaitement connecté")
});

export default db;
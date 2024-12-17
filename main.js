import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use(cors());
// Ajouter un message de confirmation lorsque le serveur démarre
console.log("Démarrage du serveur...");

app.get('/', (req, res) => {
    res.send('API fonctionnelle et connectée à CockroachDB !');
  });

app.use("/auth", authRoutes); // Routes pour l'authentification
app.use("/api/lists", listRoutes); // Routes pour les listes
app.use('/api/lists', taskRoutes);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
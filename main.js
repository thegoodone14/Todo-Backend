import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
console.log("JWT_SECRET chargé :", jwtSecret);
const app = express();
const PORT = process.env.PORT || 3001;

// Dans votre fichier principal (main.js ou app.js)
app.use(cors({
  origin: ['http://localhost:3000', 'https://votre-frontend-url.com'], // Ajoutez l'URL de votre frontend déployé
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Middleware pour traiter les requêtes JSON

  // Ajouter un message de confirmation lorsque le serveur démarre
console.log("Démarrage du serveur...");

app.get('/', (req, res) => {
    res.send('API fonctionnelle et connectée à CockroachDB !');
  });

app.use("/api/auth", authRoutes); // Routes pour l'authentification
app.use("/api/lists", listRoutes); // Routes pour les listes
app.use('/api/lists', taskRoutes);
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
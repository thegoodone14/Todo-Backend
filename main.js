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

// Configuration CORS
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://todo-frontend-bay-nu.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Access-Control-Allow-Origin']
};

app.use(cors(corsOptions));

// Middleware pour les en-têtes CORS personnalisés
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (corsOptions.origin.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json());

console.log("Démarrage du serveur...");

app.get('/', (req, res) => {
    res.send('API fonctionnelle et connectée à CockroachDB !');
});

app.use("/api/auth", authRoutes);
app.use("/api/list", listRoutes);
app.use('/api/list', taskRoutes);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
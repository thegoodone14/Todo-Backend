import pkg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    ca: fs.readFileSync('/etc/secrets/root.crt'), 
  },
});

pool.connect()
  .then(() => console.log('Connecté à CockroachDB Cloud'))
  .catch(err => console.error('Erreur de connexion à la base :', err));

export default pool;

-- Ajout des nouvelles colonnes à la table task
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "priority" VARCHAR(10) DEFAULT 'MEDIUM' CHECK ("priority" IN ('LOW', 'MEDIUM', 'HIGH'));
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "dueDate" TIMESTAMP;

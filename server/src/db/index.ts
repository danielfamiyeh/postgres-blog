import { Pool } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string),
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
});
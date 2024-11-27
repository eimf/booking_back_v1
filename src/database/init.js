import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { seedDatabase } from './seed.js';

let db = null;

export async function getDatabase() {
  if (db) {
    return db;
  }

  db = await open({
    filename: './salon.db',
    driver: sqlite3.Database
  });

  return db;
}

export async function initializeDatabase() {
  const db = await getDatabase();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS stylists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      specialization TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      duration INTEGER NOT NULL,
      price DECIMAL(10,2) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      service_id INTEGER NOT NULL,
      stylist_id INTEGER NOT NULL,
      appointment_date DATETIME NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services (id),
      FOREIGN KEY (stylist_id) REFERENCES stylists (id)
    );
  `);

  // Seed initial data
  await seedDatabase(db);
}
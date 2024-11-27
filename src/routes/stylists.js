import express from 'express';
import { getDatabase } from '../database/init.js';

export const router = express.Router();

// Get all stylists
router.get('/', async (req, res) => {
  try {
    const db = await getDatabase();
    const stylists = await db.all('SELECT * FROM stylists');
    res.json(stylists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stylist availability
router.get('/:id/availability', async (req, res) => {
  try {
    const db = await getDatabase();
    const { date } = req.query;

    const appointments = await db.all(`
      SELECT appointment_date
      FROM appointments
      WHERE stylist_id = ? 
      AND DATE(appointment_date) = DATE(?)
      AND status != 'cancelled'
    `, [req.params.id, date]);

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
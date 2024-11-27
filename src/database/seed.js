export async function seedDatabase(db) {
  const stylistsCount = await db.get('SELECT COUNT(*) as count FROM stylists');
  
  if (stylistsCount.count === 0) {
    // Seed stylists
    await db.run(`
      INSERT INTO stylists (name, specialization) VALUES 
      ('Sarah Johnson', 'Hair Coloring'),
      ('Michael Chen', 'Haircuts'),
      ('Emma Davis', 'Styling')
    `);

    // Seed services
    await db.run(`
      INSERT INTO services (name, description, duration, price) VALUES 
      ('Haircut', 'Professional haircut and styling', 60, 50.00),
      ('Color Treatment', 'Full hair coloring service', 120, 120.00),
      ('Blowout', 'Professional blow dry and style', 45, 35.00),
      ('Hair Treatment', 'Deep conditioning treatment', 30, 40.00)
    `);
  }
}
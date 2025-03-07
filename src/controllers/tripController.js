const db = require("../config/db");


const createTrip = (req, res) => {
  const { title, destination, startDate, endDate, userId } = req.body;

  if (!title || !destination || !startDate || !endDate || !userId) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const stmt = db.prepare("INSERT INTO trips (user_id, title, destination, start_date, end_date) VALUES (?, ?, ?, ?, ?)");
  
  try {
    stmt.run(userId, title, destination, startDate, endDate);
    res.status(201).json({ message: "Voyage créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du voyage" });
  }
};

const getTrips = (req, res) => {
  const { userId } = req.query;

  const trips = db.prepare("SELECT * FROM trips WHERE user_id = ?").all(userId);

  if (trips.length === 0) {
    return res.status(404).json({ message: "Aucun voyage trouvé pour cet utilisateur" });
  }

  res.status(200).json({ trips });
};

module.exports = { createTrip, getTrips};

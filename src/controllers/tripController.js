import db from "../config/db.js";

// Fonction pour créer un voyage
export const createTrip = (req, res) => {
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

// Fonction pour obtenir les voyages d'un utilisateur
export const getTrips = (req, res) => {
  const { userId } = req.query;

  const trips = db.prepare("SELECT * FROM trips WHERE user_id = ?").all(userId);

  if (trips.length === 0) {
    return res.status(404).json({ message: "Aucun voyage trouvé pour cet utilisateur" });
  }

  res.status(200).json({ trips });
};

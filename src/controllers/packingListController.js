import db from "../config/db.js";

// Fonction pour créer une liste de packing
export const createPackingList = (req, res) => {
  const { tripId, items } = req.body;

  if (!tripId || !items) {
    return res.status(400).json({ message: "Trip ID et items sont requis" });
  }

  const stmt = db.prepare("INSERT INTO packing_lists (trip_id, items) VALUES (?, ?)");
  
  try {
    stmt.run(tripId, JSON.stringify(items));
    res.status(201).json({ message: "Liste de packing créée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la liste de packing" });
  }
};

// Fonction pour obtenir la liste de packing d'un voyage
export const getPackingList = (req, res) => {
  const { tripId } = req.params;

  const packingList = db.prepare("SELECT * FROM packing_lists WHERE trip_id = ?").get(tripId);

  if (!packingList) {
    return res.status(404).json({ message: "Liste de packing non trouvée pour ce voyage" });
  }

  res.status(200).json({ items: JSON.parse(packingList.items) });
};

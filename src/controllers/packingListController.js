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

// Fonction pour supprimer un item d'une liste de packing
export const deleteItemFromPackingList = (req, res) => {
  const { tripId } = req.params; 
  const { itemName } = req.body; 


  const packingList = db.prepare("SELECT * FROM packing_lists WHERE trip_id = ?").get(tripId);

  if (!packingList) {
    return res.status(404).json({ message: "Liste de packing non trouvée pour ce voyage" });
  }

  // Parse les items (stockés en JSON)
  const items = JSON.parse(packingList.items);


  const itemIndex = items.indexOf(itemName);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item non trouvé dans la liste" });
  }

  items.splice(itemIndex, 1);

  const stmt = db.prepare("UPDATE packing_lists SET items = ? WHERE trip_id = ?");
  stmt.run(JSON.stringify(items), tripId);

  res.status(200).json({ message: "Item supprimé avec succès", items });
};


// Fonction pour mettre à jour un item dans la liste de packing
export const updateItemInPackingList = (req, res) => {
  const { tripId } = req.params; 
  const { oldItemName, newItemName } = req.body;

  if (!oldItemName || !newItemName) {
    return res.status(400).json({ message: "Les noms de l'ancien et du nouveau item sont requis" });
  }


  const packingList = db.prepare("SELECT * FROM packing_lists WHERE trip_id = ?").get(tripId);

  if (!packingList) {
    return res.status(404).json({ message: "Liste de packing non trouvée pour ce voyage" });
  }


  const items = JSON.parse(packingList.items);

  const itemIndex = items.indexOf(oldItemName);
  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item non trouvé dans la liste" });
  }

  items[itemIndex] = newItemName;

  const stmt = db.prepare("UPDATE packing_lists SET items = ? WHERE trip_id = ?");
  stmt.run(JSON.stringify(items), tripId);

  res.status(200).json({ message: "Item mis à jour avec succès", items });
};

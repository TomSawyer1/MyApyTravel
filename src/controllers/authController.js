const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const db = require ("../config/db.js");

// Fonction pour l'enregistrement
 const register = (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const stmt = db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
  
  try {
    stmt.run(username, email, hashedPassword);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

// Fonction pour la connexion
 const login = (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user) {
    return res.status(404).json({ message: "Utilisateur non trouvé" });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Mot de passe incorrect" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.status(200).json({ message: "Connexion réussie", token });
};

module.exports = { register, login };

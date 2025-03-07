const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db.js");
const { z } = require("zod");

// Schéma de validation avec Zod
const registerSchema = z.object({
  username: z.string({ required_error: "Le nom d'utilisateur est requis" })
    .min(3, { message: "Le nom d'utilisateur doit contenir au moins 3 caractères" }),
  email: z.string({ required_error: "L'email est requis" })
    .email({ message: "Email invalide" }),
  password: z.string({ required_error: "Le mot de passe est requis" })
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});

// Fonction pour l'enregistrement
const register = (req, res) => {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    // Formattez l'erreur pour renvoyer un message simple en français
    const errorMessage = parseResult.error.errors.map(err => err.message).join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  const { username, email, password } = parseResult.data;
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
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: parseResult.error.errors });
  }

  const { email, password } = parseResult.data;
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

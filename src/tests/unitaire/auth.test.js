const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

// Schémas Zod pour la validation
const registerSchema = z.object({
  username: z.string().min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe invalide"),
});

describe("Auth Utilities", () => {
  // Tests pour le hachage des mots de passe
  describe("Password Hashing", () => {
    test("Devrait hasher correctement un mot de passe", () => {
      const password = "Password123!";
      const hashedPassword = bcrypt.hashSync(password, 10); // coût du hachage 10 pour performance et sécurité

      expect(hashedPassword).not.toBe(password); // Vérifie que le hash est différent du mot de passe
      expect(bcrypt.compareSync(password, hashedPassword)).toBe(true); // Vérifie que la comparaison fonctionne
    });

    test("Devrait renvoyer false pour un mot de passe incorrect", () => {
      const password = "Password123!";
      const wrongPassword = "lookatthat";
      const hashedPassword = bcrypt.hashSync(password, 10);

      expect(bcrypt.compareSync(wrongPassword, hashedPassword)).toBe(false); // Vérifie que le mot de passe incorrect échoue
    });
  });

  // Tests pour les JWT
  describe("JWT", () => {
    test("Devrait générer un JWT valide", () => {
      const payload = { id: 1 };
      const secret = "test_secret";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      expect(token).toBeDefined(); // Vérifie que le token est généré
      expect(typeof token).toBe("string"); // Vérifie que le token est une chaîne de caractères
    });

    test("Devrait décoder un JWT valide", () => {
      const payload = { id: 1 };
      const secret = "test_secret";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      const decoded = jwt.verify(token, secret); // Décodage du token

      expect(decoded.id).toBe(payload.id); // Vérifie que le payload est correctement décodé
    });
  });

  // Tests pour la validation Zod (register)
  describe("Zod Validation - Register", () => {
    test("Devrait accepter un utilisateur valide", () => {
      const validUser = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };

      const result = registerSchema.safeParse(validUser);
      expect(result.success).toBe(true); // Vérifie que la validation réussit
    });

    test("Devrait rejeter un utilisateur avec un nom d'utilisateur trop court", () => {
      const invalidUser = {
        username: "us", // Trop court
        email: "test@example.com",
        password: "password123",
      };

      const result = registerSchema.safeParse(invalidUser);
      expect(result.success).toBe(false); // Vérifie que la validation échoue
      expect(result.error.issues[0].message).toBe("Le nom d'utilisateur doit contenir au moins 3 caractères");
    });

    test("Devrait rejeter un utilisateur avec un email invalide", () => {
      const invalidUser = {
        username: "testuser",
        email: "invalid-email", // Email invalide
        password: "password123",
      };

      const result = registerSchema.safeParse(invalidUser);
      expect(result.success).toBe(false); // Vérifie que la validation échoue
      expect(result.error.issues[0].message).toBe("Email invalide");
    });

    test("Devrait rejeter un utilisateur avec un mot de passe trop court", () => {
      const invalidUser = {
        username: "testuser",
        email: "test@example.com",
        password: "pass", // Trop court
      };

      const result = registerSchema.safeParse(invalidUser);
      expect(result.success).toBe(false); // Vérifie que la validation échoue
      expect(result.error.issues[0].message).toBe("Le mot de passe doit contenir au moins 6 caractères");
    });
  });

  // Tests pour la validation Zod (login)
  describe("Zod Validation - Login", () => {
    test("Devrait accepter une connexion valide", () => {
      const validLogin = {
        email: "test@example.com",
        password: "password123",
      };

      const result = loginSchema.safeParse(validLogin);
      expect(result.success).toBe(true); // Vérifie que la validation réussit
    });

    test("Devrait rejeter une connexion avec un email invalide", () => {
      const invalidLogin = {
        email: "invalid-email", // Email invalide
        password: "password123",
      };

      const result = loginSchema.safeParse(invalidLogin);
      expect(result.success).toBe(false); // Vérifie que la validation échoue
      expect(result.error.issues[0].message).toBe("Email invalide");
    });

    test("Devrait rejeter une connexion avec un mot de passe trop court", () => {
      const invalidLogin = {
        email: "test@example.com",
        password: "pass", // Trop court
      };

      const result = loginSchema.safeParse(invalidLogin);
      expect(result.success).toBe(false); // Vérifie que la validation échoue
      expect(result.error.issues[0].message).toBe("Mot de passe invalide");
    });
  });
});
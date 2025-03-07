const request = require("supertest");
const app = require("../../app");
const db = require("../../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("AuthController Integration Tests", () => {
    beforeAll(async () => {
        // Nettoyer la base de données avant de commencer les tests
        const stmt = db.prepare("DELETE FROM users");
        stmt.run();
    });

    afterAll(async () => {
        db.close();
    });

    describe("POST /register", () => {
        test("Devrait enregistrer un nouvel utilisateur avec succès", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "testuser",
                    email: "test@example.com",
                    password: "Password123!",
                });

            expect(res.statusCode).toBe(201);
            expect(res.body.message).toBe("Utilisateur créé avec succès");

            // Vérifier que l'utilisateur est bien enregistré dans la base de données
            const user = db.prepare("SELECT * FROM users WHERE email = ?").get("test@example.com");
            expect(user).toBeDefined();
            expect(user.username).toBe("testuser");
            expect(bcrypt.compareSync("Password123!", user.password)).toBe(true);
        });

        // Sans un champ remplis mail
        test("Devrait renvoyer une erreur si un champ est manquant", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    username: "testuser",
                    password: "Password123!",
                });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("L'email est requis");
        });
    });

    // Connexion
    describe("POST /login", () => {
        test("Devrait connecter un utilisateur avec des identifiants valides", async () => {
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "testuser",
                    email: "test@example.com",
                    password: "Password123!",
                });

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "test@example.com",
                    password: "Password123!",
                });

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Connexion réussie");
            expect(res.body.token).toBeDefined();

            const decoded = jwt.verify(res.body.token, process.env.JWT_SECRET);// Vérifier que le token est valide
            expect(decoded.id).toBeDefined();
        });

        // Connexion avec un faux mail
        test("Devrait renvoyer une erreur si l'email est incorrect", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "wrong@example.com", 
                    password: "Password123!",
                });

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Utilisateur non trouvé");
        });

        test("Devrait renvoyer une erreur si le mot de passe est incorrect", async () => {
            // Enregistrer un utilisateur pour le test de connexion
            await request(app)
                .post("/api/auth/register")
                .send({
                    username: "testuser",
                    email: "test@example.com",
                    password: "Password123!",
                });

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "test@example.com",
                    password: "fauxpswd",
                });

            expect(res.statusCode).toBe(401);
            expect(res.body.message).toBe("Mot de passe incorrect");
        });
    });
});
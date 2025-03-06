import request from "supertest";
import app from "../../src/server.js"; // Assure-toi que ton serveur est bien exporté dans server.js

describe("Auth API", () => {
    
    test("Devrait créer un utilisateur et retourner un statut 201", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                username: "TestUser",
                email: "test@example.com",
                password: "password123"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
    });

    test("Devrait refuser un login avec un mauvais mot de passe", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "test@example.com",
                password: "wrongpassword"
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Mot de passe incorrect");
    });

});

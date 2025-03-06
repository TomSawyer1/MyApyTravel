const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


describe("Auth Utilities", () => {
    
    test("Devrait hasher correctement un mot de passe", () => {

        expect(1 + 1).toBe(2);
        
        const password = "monSuperMotDePasse";
        const hashedPassword = bcrypt.hashSync(password, 10);

        expect(hashedPassword).not.toBe(password); // Vérifie que le hash est différent du mot de passe
        expect(bcrypt.compareSync(password, hashedPassword)).toBe(true); // Vérifie que la comparaison fonctionne
    });

    test("Devrait renvoyer false pour un mot de passe incorrect", () => {
        const password = "monSuperMotDePasse";
        const wrongPassword = "mauvaisMotDePasse";
        const hashedPassword = bcrypt.hashSync(password, 10);

        expect(bcrypt.compareSync(wrongPassword, hashedPassword)).toBe(false);
    });

    test("Devrait générer un JWT valide", () => {
        const payload = { id: 1 };
        const secret = "test_secret";
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");
    });

    test("Devrait décoder un JWT valide", () => {
        const payload = { id: 1 };
        const secret = "test_secret";
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        const decoded = jwt.verify(token, secret);

        expect(decoded.id).toBe(payload.id);
    });

});

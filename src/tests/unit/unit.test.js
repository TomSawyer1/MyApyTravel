const { register, login } = require('../../controllers/authController');
const { createTrip, getTrips } = require('../../controllers/tripController');
const { createPackingList, getPackingList, deleteItemFromPackingList, updateItemInPackingList } = require('../../controllers/packingListController');
const db = require('../../config/db');

describe('Unit Tests', () => {
  beforeEach(() => {
    // Réinitialiser la base de données avant chaque test
    db.run('DELETE FROM users');
    db.run('DELETE FROM trips');
    db.run('DELETE FROM packing_lists');
  });

  it('should register a new user', () => {
    const req = {
      body: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur créé avec succès' });
  });

  it('should login the user and return a token', () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    // Simuler l'insertion d'un utilisateur dans la base de données
    db.run("INSERT INTO users (username, email, password) VALUES ('testuser', 'test@example.com', 'hashedpassword')");
    login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveProperty('token');
  });

  // Ajoutez d'autres tests unitaires ici
});
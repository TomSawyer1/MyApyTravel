# MyApyTravel

MyApyTravel est une API RESTful développée avec Node.js et Express.js, permettant la gestion de listes de voyage (packing lists). L'API offre des fonctionnalités d'authentification sécurisée, de validation des données et de gestion des utilisateurs et de leurs listes.

## 🛠️ Technologies

- **Backend:** Node.js, Express.js 5
- **Authentification:** JSON Web Token (JWT)
- **Validation des données:** Zod
- **Base de données:** SQLite (sans Prisma)
- **ORM/ODM:** Libre
- **Chiffrement des mots de passe:** Libre
- **Services tiers:** Aucun

## 📌 Fonctionnalités

- Gestion des utilisateurs (inscription, connexion, suppression)
- Création, mise à jour et suppression de listes de voyage
- Gestion des articles dans une liste
- Authentification par JWT
- Validation des entrées utilisateur avec Zod

## 📂 Installation

### Prérequis
- Node.js (v16+ recommandé)
- npm ou yarn

### Étapes

1. Cloner le dépôt :
   ```sh
   git clone https://github.com/TomSawyer1/MyApyTravel.git
   cd MyApyTravel
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```
3. Configurer l'environnement :
   - Créer un fichier `.env`
   - Ajouter les variables nécessaires (exemple dans `.env.example`)
4. Lancer le serveur :
   ```sh
   npm start
   ```

## 🛠️ Utilisation

L'API fonctionne sur `http://localhost:3000` par défaut. Voici quelques exemples d'utilisation :

### 🔐 Authentification
- **Inscription** : `POST /api/auth/register`
- **Connexion** : `POST /api/auth/login`

### 📋 Gestion des listes
- **Créer une liste** : `POST /api/lists`
- **Récupérer toutes les listes** : `GET /api/lists`
- **Modifier une liste** : `PUT /api/lists/:id`
- **Supprimer une liste** : `DELETE /api/lists/:id`

### 📦 Gestion des articles
- **Ajouter un article** : `POST /api/lists/:id/items`
- **Modifier un article** : `PUT /api/lists/:id/items/:itemId`
- **Supprimer un article** : `DELETE /api/lists/:id/items/:itemId`

## 🛡️ Sécurité
- JWT pour l'authentification
- Chiffrement des mots de passe
- Validation des données avec Zod

## 🚀 Améliorations futures
- Implémentation d'un ORM
- Ajout de tests unitaires et d'intégration
- Documentation OpenAPI (Stoplight)

## 📄 Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d’informations.

---

🎒 *Préparez vos voyages sans stress avec MyApyTravel !*


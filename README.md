# 🌊 AquaRhône

Application web fullstack de réservation d’activités aquatiques avec un backend Node.js/Express et un frontend Vue.js.

---

## 🔹 PARTIE BACKEND

### 📌 Description

Ce backend Node.js/Express fournit une API REST sécurisée avec authentification JWT pour l'application de réservation d’activités aquatiques **AquaRhône**.

### 🚀 Fonctionnalités principales

- Authentification (login, register) avec token JWT
- Rôles utilisateur (admin, user)
- CRUD des activités aquatiques (réservé aux admins)
- Réservation d’activités (par les utilisateurs)
- Connexion à MongoDB
- Middleware de protection des routes

### 📁 Structure

```
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── .env
```

### ⚙️ Installation

#### 🔸 Prérequis

- Node.js v16+
- MongoDB (local ou distant)
- npm ou yarn

#### 🔸 Étapes

1. Cloner le dépôt et accéder au dossier `AquarHone-backend` :
```bash
cd AquarHone-backend
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` :
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aquarhone
JWT_SECRET=tonjwtsecret
```

4. Lancer le serveur en développement :
```bash
npm run dev
```

Le backend est maintenant disponible sur :  
👉 `http://localhost:5000`

### 🔗 Routes principales

- `POST /api/auth/register` → Créer un compte
- `POST /api/auth/login` → Connexion
- `GET /api/auth/me` → Infos utilisateur connecté
- `GET /api/activities` → Lister les activités
- `POST /api/activities` → Ajouter une activité (admin)
- `POST /api/reservations` → Réserver une activité
- etc.




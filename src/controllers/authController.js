// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inscription utilisateur
exports.register = async (req, res) => {
  const { nom, email, motdepasse } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(motdepasse, 10);
    const newUser = new User({ nom, email, motdepasse: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Connexion utilisateur
exports.login = async (req, res) => {
  const { email, motdepasse } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const isValid = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isValid) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer infos utilisateur connecté (profil)
exports.getMe = async (req, res) => {
  try {
    const userId = req.user.id; // rempli par verifyToken middleware
    const user = await User.findById(userId).select('-motdepasse'); // on enlève motdepasse du résultat
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

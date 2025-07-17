const Reservation = require('../models/Reservation');
const Activity = require('../models/Activity');

// Réserver une activité (utilisateur connecté)
exports.createReservation = async (req, res) => {
  const { activite, dateReservation, nombrePlaces } = req.body;
  const utilisateur = req.user.id; // On récupérera req.user après authentification

  try {
    // Vérifier si l'activité existe
    const activity = await Activity.findById(activite);
    if (!activity) return res.status(404).json({ message: "Activité non trouvée" });

    // Vérifier places restantes
    if (activity.placesRestantes < nombrePlaces) {
      return res.status(400).json({ message: "Pas assez de places disponibles" });
    }

    // Créer la réservation
    const reservation = new Reservation({
      utilisateur,
      activite,
      dateReservation,
      nombrePlaces
    });
    await reservation.save();

    // Mettre à jour places restantes
    activity.placesRestantes -= nombrePlaces;
    await activity.save();

    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir l'historique des réservations d'un utilisateur (utilisateur connecté)
exports.getUserReservations = async (req, res) => {
  const utilisateur = req.user.id;

  try {
    const reservations = await Reservation.find({ utilisateur }).populate('activite');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir toutes les réservations (admin)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('utilisateur').populate('activite');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

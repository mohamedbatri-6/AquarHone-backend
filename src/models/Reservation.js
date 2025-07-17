const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activite: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  dateReservation: { type: Date, required: true }, // Date et heure choisies
  nombrePlaces: { type: Number, required: true, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);

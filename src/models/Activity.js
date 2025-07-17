const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },         // kayak, paddle, etc.
  lieu: { type: String, required: true },
  creneaux: [{ type: Date, required: true }],      // tableau de dates/heures disponibles
  prix: { type: Number, required: true },
  placesRestantes: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);

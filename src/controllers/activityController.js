const Activity = require('../models/Activity');

// Ajouter une activité (admin)
exports.createActivity = async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lister toutes les activités (public)
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Voir détail d'une activité (public)
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) return res.status(404).json({ message: "Activité non trouvée" });
    res.json(activity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une activité (admin)
exports.updateActivity = async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Activité non trouvée" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une activité (admin)
exports.deleteActivity = async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Activité non trouvée" });
    res.json({ message: "Activité supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

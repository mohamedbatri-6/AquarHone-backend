const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

// Routes publiques
router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getActivityById);

// Routes admin protégées
router.post('/', verifyToken, verifyAdmin, activityController.createActivity);
router.put('/:id', verifyToken, verifyAdmin, activityController.updateActivity);
router.delete('/:id', verifyToken, verifyAdmin, activityController.deleteActivity);

module.exports = router;

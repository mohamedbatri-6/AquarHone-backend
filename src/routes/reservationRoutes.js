const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

// Utilisateur connecté peut créer et voir ses réservations
router.post('/', verifyToken, reservationController.createReservation);
router.get('/my', verifyToken, reservationController.getUserReservations);

// Seul admin peut voir toutes les réservations
router.get('/', verifyToken, verifyAdmin, reservationController.getAllReservations);

module.exports = router;

const express = require('express');
const router = express.Router();

const { register, login, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, getMe);  // <-- nouvelle route protégée

module.exports = router;

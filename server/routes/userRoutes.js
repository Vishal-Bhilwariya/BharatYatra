const express = require('express');
const router = express.Router();
const { register, login, googleAuth, getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/userAuth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/profile', protect, getProfile);

module.exports = router;

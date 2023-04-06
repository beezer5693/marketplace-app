const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/userController');
const { authorizeUser } = require('../middleware/authMiddleware');

module.exports = router;

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authorizeUser, getLoggedInUser);

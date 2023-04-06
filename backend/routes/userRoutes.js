const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

module.exports = router;

router.post('/register', registerUser);
router.post('/login', loginUser);

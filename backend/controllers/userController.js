const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc    Register a new user
// @route   /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ message: 'Please enter all fields' });
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400).json({ message: 'User already exists' });
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = {
		name,
		email,
		password: hashedPassword
	};

	await User.create(user);

	res.status(201).json(user);
});

const loginUser = asyncHandler(async (req, res) => {});
const getLoggedInUser = asyncHandler(async (req, res) => {});

module.exports = {
	registerUser,
	loginUser,
	getLoggedInUser
};

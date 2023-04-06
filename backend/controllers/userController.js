const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

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

	const user = await User.create({
		name,
		email,
		password: hashedPassword
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)
		});
	} else {
		res.status(400).json({ message: 'Invalid user data' });
	}
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)
		});
	} else {
		res.status(400).json({ message: 'Invalid credentials' });
	}
});

const getLoggedInUser = asyncHandler(async (req, res) => {});

module.exports = {
	registerUser,
	loginUser,
	getLoggedInUser
};

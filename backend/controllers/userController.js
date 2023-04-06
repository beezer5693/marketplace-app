const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {});
const loginUser = asyncHandler(async (req, res) => {});

module.exports = {
	registerUser,
	loginUser
};

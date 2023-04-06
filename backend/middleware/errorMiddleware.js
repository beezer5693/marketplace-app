const errorHandler = (err, res) => {
	const statusCode = res.statusCode ? res.statusCode : 500;
	res.status(statusCode).json({
		message: err.message
	});
};

module.exports = { errorHandler };

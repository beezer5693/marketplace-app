const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

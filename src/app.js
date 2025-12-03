// src/app.js
const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

//Routes
const authRoutes = require('./routes/authRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const incomeRoutes = require('./routes/incomeRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Test DB connection + sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    // Make sure models are loaded before sync
    require('./models/User');
    require('./models/Balance');
    require('./models/Income');

    await sequelize.sync(); // or { alter: true } during development
    console.log('Database synced.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/balance', balanceRoutes);
app.use('/api/income', incomeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('HishabKitabhBackend is running!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

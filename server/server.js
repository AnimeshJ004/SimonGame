require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// HighScore Schema
const highScoreSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const HighScore = mongoose.model('HighScore', highScoreSchema);

// Routes
app.get('/highscore', async (req, res) => {
  try {
    const highScore = await HighScore.findOne().sort({ score: -1 });
    res.json({ highScore: highScore ? highScore.score : 0 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve high score' });
  }
});

app.post('/highscore', async (req, res) => {
  try {
    const { score } = req.body;
    const newHighScore = new HighScore({ score });
    await newHighScore.save();
    res.status(201).json({ message: 'High score saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save high score' });
  }
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('client'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

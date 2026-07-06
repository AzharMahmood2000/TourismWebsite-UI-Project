const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// 🌟 Default Root Route: Browser-la direct-ah hit panna indha check msg varum
app.get('/', (req, res) => {
    res.send("<h1>🌍 Gamanaya Backend Server Running Successfully!</h1><p>Database and API layer completely connected.</p>");
});

// Sample JSON Test Route
app.get('/api/test', (req, res) => {
    res.json({ status: "success", message: "Gamanaya Backend API running successfully! 🌍✈️" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🎯 Server actively running on port ${PORT}`);
});
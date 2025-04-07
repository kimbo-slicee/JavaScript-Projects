const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Example route
app.get('/api/data', async (req, res) => {
    const apiKey = process.env.API_KEY;

    // Call the third-party API
    const response = await fetch(`https://api.example.com/data?apiKey=${apiKey}`);
    const data = await response.json();

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

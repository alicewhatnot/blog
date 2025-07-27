const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');


// Middleware to parse JSON bodies from POST requests
app.use(express.json());

// Endpoint to handle updating the JSON file
app.post('/update-articles', (req, res) => {
    const updatedArticles = req.body; // Get the updated data from the request body

    // Define the path to the articles.json file
    const filePath = path.join(__dirname, 'articles.json');

    // Write the updated data to articles.json
    fs.writeFile(filePath, JSON.stringify(updatedArticles, null, 2), (err) => {
        if (err) {
            console.error('Error saving JSON:', err);
            return res.status(500).json({ message: 'Error saving JSON file' });
        }
        res.status(200).json({ message: 'Updated JSON file successfully' });
    });
});

// Use the cors middleware
app.use(cors());

// Define your routes
app.post('/update-articles', (req, res) => {
  // Your route logic here
  res.send('Articles updated');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
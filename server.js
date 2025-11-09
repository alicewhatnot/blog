const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http'); // Required for local testing
const https = require('https'); // Required for production
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS setup (Allow localhost during testing)
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://mikegillbanks.co.uk' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.static(path.join(__dirname, 'public')));

// Directory to store uploaded files
const uploadFolder = path.join(__dirname, '/images');

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadFolder); // Save files in the images directory
    },
    filename: (req, file, cb) => {
        const filePath = path.join(__dirname, 'articles.json');
        const fileExt = path.extname(file.originalname); // Get file extension (e.g., .jpg, .png)

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading articles.json:', err);
                return cb(err);
            }

            let articles = [];
            try {
                articles = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing articles.json:', parseErr);
                return cb(parseErr);
            }

            // Get the highest ID from the first article
            let lastId = 0;
            if (articles.length > 0) {
                lastId = articles[0].Id; // Read the highest ID from the first article
            }

            // Increment for the new image
            const newId = lastId + 1;
            const newFileName = `blogImage${newId}${fileExt}`;

            console.log('New filename:', newFileName);
            cb(null, newFileName);
        });
    },
});


const upload = multer({ storage });

// API Routes
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
});

app.post('/api/update-articles', (req, res) => {
    const filePath = path.join(__dirname, 'articles.json');
    fs.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err) return res.status(500).json({ message: 'Error saving JSON' });
        res.status(200).json({ message: 'Updated successfully' });
    });
});

// Server Setup
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/mikegillbanks.co.uk/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/mikegillbanks.co.uk/cert.pem'),
        ca: fs.readFileSync('/etc/letsencrypt/live/mikegillbanks.co.uk/chain.pem')
    };
    https.createServer(options, app).listen(443, () => console.log('HTTPS Server running on port 443'));
} else {
    http.createServer(app).listen(3000, () => console.log('HTTP Server running on port 3000'));
}
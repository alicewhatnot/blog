const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');

// Middleware to parse URL-encoded bodies (for form fields like 'Id')
app.use(express.urlencoded({ extended: true }));  // This handles form data
app.use(express.json());  // This handles JSON data
app.use(cors());  // Enable CORS

// Directory to store uploaded files
const uploadFolder = path.join(__dirname, '/images');


// Configure Multer storage
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadFolder); // Save files in the images directory
    },
    filename: (req, file, cb) => {
        // Path to the articles.json file
        const filePath = path.join(__dirname, 'articles.json');

        // Extract the extension from the uploaded file
        const fileExt = path.extname(file.originalname); // e.g., ".jpg" or ".png"

        // Read the articles.json file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading articles.json:', err);
                return cb(err); // Return error if reading JSON fails
            }

            // Parse the JSON data
            const articles = JSON.parse(data);

            // Get the image name of the first article
            const imagePath = articles[0].image; // Assuming 'image' contains the file path
            const imageName = path.basename(imagePath); // Extract only the file name (e.g., blogImageX.extension)

            // Extract the numeric part of the image name (e.g., blogImageX -> X)
            const match = imageName.match(/blogImage(\d+)/); // Regex to match blogImageX
            if (match) {
                const currentNumber = parseInt(match[1], 10); // Extract the numeric part

                // Increment the number and create a new file name
                const newNumber = currentNumber + 1;
                const newFileName = `blogImage${newNumber}${fileExt}`; // Use the extracted extension

                console.log('New filename:', newFileName);
                cb(null, newFileName); // Use the incremented file name
            } else {
                console.error('Invalid image name format:', imageName);
                cb(new Error('Invalid image name format in JSON.'));
            }
        });
    },
});
const upload = multer({ storage });


// Endpoint to handle file uploads
app.post('/upload-post', upload.single('image'), (req, res) => {
    console.log('req body Id - '+ req.body.Id)


    console.log('Request received');
    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('File uploaded successfully', req.file);
    return res.status(200).json({
        message: 'File uploaded successfully',
        file: req.file,
    });
});


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

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
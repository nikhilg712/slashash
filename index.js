// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000; // Define the port the server will listen on

// Create a connection pool for MySQL database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'Nikku123!',
    database: 'quotes_db',
    waitForConnections: true, 
});

// Middleware setup
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(express.static('frontend')); // Serve static files from the 'public' directory


// Check database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
    connection.release(); // Release the connection back to the pool
});

// Endpoint to save a favourite quote
app.post('/favourite', (req, res) => {
    const { quote, author } = req.body; // Extract quote and author from the request body
    const query = 'INSERT INTO favorites (quote, author) VALUES (?, ?)'; // SQL query to insert the quote
    pool.execute(query, [quote, author], (err) => {
        if (err) {
            console.error('Error saving favourite:', err);
            return res.status(500).send(err); // Send 500 status code if there is an error
        }
        res.status(200).send('Favourite saved!'); // Send success message
    });
});

// Endpoint to get all favourite quotes
app.get('/favourites', (req, res) => {
    pool.query('SELECT * FROM favorites', (err, results) => { // SQL query to select all favourite quotes
        if (err) {
            return res.status(500).send(err); // Send 500 status code if there is an error
        }
        res.json(results); // Send the results as a JSON response
    });
});

// Endpoint to serve the favourites page
app.get('/favourites-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'favourites.html')); // Send the favourites HTML file
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`); // Log that the server is running
});

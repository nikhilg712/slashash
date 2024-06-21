const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'quotes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(bodyParser.json());
app.use(express.static('public'));


pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
    connection.release();
});

app.post('/favourite', (req, res) => {
    const { quote, author } = req.body;
    const query = 'INSERT INTO favorites (quote, author) VALUES (?, ?)';
    pool.execute(query, [quote, author], (err) => {
        if (err) {
            console.error('Error saving favourite:', err);
            return res.status(500).send(err);
        }
        res.status(200).send('Favourite saved!');
    });
});

app.get('/favourites', (req, res) => {
    pool.query('SELECT * FROM favorites', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/favourites-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'favourites.html'));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

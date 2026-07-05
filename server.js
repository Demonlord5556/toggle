const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// 1. Connect to your MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Heroamiop1234#', 
    database: 'todo_app'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Successfully connected to the MySQL database!');
});


app.post('/login', (req, res) => {
    const { email, password } = req.body; 

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (results.length > 0) {
            res.json({ success: true, userId: results[0].id });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    });
});


app.listen(3000, () => {
    console.log('Backend server is running on http://localhost:3000');
});
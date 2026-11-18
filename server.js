
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'my_lab4_secret_key';

app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Lab 4 Authentication API is running'
    });
});

// Register route
app.post('/register', (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({
                message: 'Password hashing failed'
            });
        }

        const sql = `
            INSERT INTO users (username, name, password)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [username, name, hashedPassword], function(err) {
            if (err) {
                return res.status(400).json({
                    message: 'Username already exists'
                });
            }

            res.status(201).json({
                message: 'User registered successfully',
                userId: this.lastID
            });
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required'
        });
    }

    db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Database error'
                });
            }

            if (!user) {
                return res.status(400).json({
                    message: 'User not found'
                });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Password verification failed'
                    });
                }

                if (!result) {
                    return res.status(400).json({
                        message: 'Incorrect password'
                    });
                }

                const token = jwt.sign(
                    { username: user.username },
                    JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.json({
                    message: 'Login successful',
                    jwt_token: token
                });
            });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

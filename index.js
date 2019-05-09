// implement your API here
const express = require('express');
const db = require('./data/db');
const server = express();

server.get('/', (req, res) => {
    res.send('Hello from Express');
});

server.listen(5000, () => 
console.log('Server running on http://localhost:5000')
);

server.get('/api/users', (req, res) => {
    db
        .find()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            res.status(500).json({message: "server error"});
        });
});
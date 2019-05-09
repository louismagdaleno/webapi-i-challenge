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

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;

	db
		.findById(id)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: `user not found` });
			}
		})
		.catch((err) => res.status(500).json({ message: `Can't get user data!!` }));
});
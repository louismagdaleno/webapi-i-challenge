// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h2>Hello World</h2>');
});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(({error, message}) => {
        res.status(500).json({error : message});
    });
});

server.post('/api/users', (req, res) => {
    const user = req.body;

    db.insert(user)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(({error, message}) => {
        res.status(500).json({error: message});
    
    })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(({ err, message }) => {
        res.status(500).json({err : message})
    });
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    db.remove(id)
    .then(removed => {
        res.status(201).json(removed);
    })
    .catch(({error, message}) => {
        res.status(500).json({error: message});
    });
});

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;

    db.update(id, body)
    .then( updated => {
        res.status(201).json(updated);
    })
    .catch(({error, message}) => {
        res.status(500).json({error : message});
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000')
});

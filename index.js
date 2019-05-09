// implement your API here
const express = require('express');
const db = require('./data/db');
const cors = require("cors");
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

server.post("/api/users/", (req, res) => {
    if (!req.body.name || !req.body.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user." });
    } else
      db.insert(req.body)
        .then(newUser => res.status(201).json(newUser))
        .catch(err =>
          res
            .status(500)
            .json({
              message: "There was an error while saving the user to the database."
            })
        );
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

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
  
    db.remove(id)
      .then(user => {
        if (!user)
          res
            .status(404)
            .json({ message: "The user with the specified ID does not exists." });
        else res.json(user);
      })
      .catch(err =>
        res.status(500).json({ message: "The user could not be removed." })
      );
  });

  server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
  
    if (!req.body.name && !req.body.bio) {
      console.log("Wrong info");
      res
        .status(400)
        .json({ errorMessage: "Please provide a name or bio for the user." });
    } else
      db.update(id, req.body)
        .then(user => {
          console.log("In request");
          if (!user)
            res
              .status(404)
              .json({
                message: "The user with the specified ID does not exists. "
              });
          res.json(user);
        })
        .catch(err =>
          res
            .status(500)
            .json({ error: "The user information could not be modified." })
        );
  });
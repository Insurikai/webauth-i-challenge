const express = require('express');
const userDB = require('./user/user_model');
const server = express();
server.use(express.json());

server.listen(8000, () => {
  console.log('listening on port 8000.');
});
server.use((req, res, next) => {
  next();
});

server.post('/register', (req, res) => {
  userDB
    .add(req.body.username, req.body.password)
    .then(user => {
      res.status(201).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get('/users', (req, res) => {
  
});
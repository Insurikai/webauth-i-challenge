const express = require('express');
const userDB = require('./user/user_model');
const bcrypt = require('bcrypt');
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
      //Send back info (Day2)
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/login', (req, res) => {
  userDB.findBy({username: req.body.username}).then(user => {
    if(!user) res.status(404).send('User not found.')
    if(!bcrypt.compareSync(req.body.password, user.password)) res.status(200).send('wrong password')
    res.status(200).send('logged in')
    //Send back info (Day2)
  }).catch(err => {
    res.status(500).send(err)
  });
});

server.get('/users', (req, res) => {
  //Check Auth
  //Show
  userDB.find();
});
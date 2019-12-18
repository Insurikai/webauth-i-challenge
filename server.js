const express = require('express');
const userDB = require('./user/user_model');
const bcrypt = require('bcrypt');
const session = require('express-session');
const server = express();
server.use(express.json());
server.listen(8000, () => {
  console.log('listening on port 8000.');
});
server.use((req, res, next) => {
  next();
});

const sessionSettings = {
  name: 'donut',
  secret: 'bearclaw',
  saveUninitialized: true,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
};

server.use(session(sessionSettings));

function restricted(req, res, next) {
  req.session && req.session.user
    ? next()
    : res.status(401).json({ message: 'No Access' });
}

server.get('/clear', (req, res) => {
  userDB.find().then(users => {
    Promise.all(users.map(user => userDB.remove(user.id))).then(values => {
      res.status(200).json({ message: 'cleared users' });
    });
  });
});
server.post('/register', (req, res) => {
  userDB
    .add(req.body.username, req.body.password)
    .then(user => {
      req.session.user = user;
      res.status(201).send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.post('/login', (req, res) => {
  userDB
    .findBy({ username: req.body.username })
    .then(user => {
      if (!user) res.status(404).send('User not found.');
      if (!bcrypt.compareSync(req.body.password, user.password))
        res.status(200).send('wrong password');
      req.session.user = user;
      res.status(200).send('logged in');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

server.get('/logout', (req, res) => {
  !req.session.user
    ? res.status(200).json({ message: 'already logged out' })
    : req.session.destroy(err => {
        err
          ? res
              .status(500)
              .json({ message: "couldn't be logged out", error: err })
          : res.status(200).json({ message: 'successfully logged out' });
      });
});

server.get('/users', restricted, (req, res) => {
  userDB.find().then(users => {
    res.status(200).send(users);
  });
});

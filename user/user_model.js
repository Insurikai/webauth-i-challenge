const db = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');

module.exports = {
  add,
  find,
  findBy,
  findById
};

function add(username, password) {
  return db('user')
    .insert({ username, password: bcrypt.hashSync(password, 12) })
    .then(ids => {
      return findById(ids[0]);
    });
}
function find(){
  return db('user')
}
function findBy(filter) {
  return db('users').where(filter);
}
function findById(id) {
  return db('user')
    .where({ id })
    .first();
}

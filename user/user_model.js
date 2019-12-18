const db = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');

module.exports = {
  knex: db,
  add,
  find,
  findBy,
  findById,
  remove
};

function add(username, password) {
  return db('user')
    .insert({ username, password: bcrypt.hashSync(password, 12) })
    .then(ids => {
      return findById(ids[0]);
    }).catch(err => err);
}
function find(){
  return db('user')
}
function findBy(filter) {
  return db('user').where(filter).first();
}
function findById(id) {
  return db('user')
    .where({ id })
    .first();
}
function remove(id) {
  return db('user').where({id}).del();
}
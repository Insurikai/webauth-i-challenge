
exports.seed = function(knex) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([
        {username: 'adam', password: 'empty'},
        {username: 'steve', password: 'empty1'},
        {username: 'molly', password: 'empty2'},
      ]);
    });
};

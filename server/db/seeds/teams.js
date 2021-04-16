exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {team_id: 101, team_name: 'E-Merge'},
        {team_id: 102, team_name: 'Aces'},
      ]);
    });
};
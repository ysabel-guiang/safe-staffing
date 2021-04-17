exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {team_id: 101, team_name: 'E-Merge', description: 'An Electric Car Company trying to make a difference in Transportation'},
        {team_id: 102, team_name: 'Aces', description: 'A Software Company providing a product for Casinos'},
      ]);
    });
};
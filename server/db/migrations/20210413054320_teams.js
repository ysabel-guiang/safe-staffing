exports.up = function(knex) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('team_id').primary()
    table.string('team_name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teams')
};
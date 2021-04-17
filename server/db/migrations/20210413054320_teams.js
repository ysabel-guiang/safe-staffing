exports.up = function(knex) {
  return knex.schema.createTable('teams', (table) => {
    table.increments('team_id').primary()
    table.string('team_name')
    table.string('description')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('teams')
};
exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('task_id').primary()
    table.string('task_name')
    table.decimal('hours_work')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks')
};
exports.up = function(knex) {
  return knex.schema.createTable('employees', (table) => {
    table.increments('employee_id').primary()
    table.string('name')
    table.integer('team_id')
    table.string('role')
    table.string('email')
    table.string('contact')
    table.decimal('hours')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees')
}
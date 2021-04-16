exports.up = function(knex) {
  return knex.schema.createTable('employees_tasks', (table) => {
    table.integer('employee_id')
    table.integer('task_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees_tasks')
};

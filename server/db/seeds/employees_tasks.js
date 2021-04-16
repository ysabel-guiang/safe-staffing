exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees_tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees_tasks').insert([
        {employee_id: 101, task_id: 6},

      ]);
    });
};
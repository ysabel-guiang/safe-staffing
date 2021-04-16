exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {task_id: 1, task_name: 'Create team files and a brief for team', hours_work: 1.0 },
        {task_id: 2, task_name: 'Test server routes', hours_work: 2.0 },
        {task_id: 3, task_name: 'Edit branding and aestheics', hours_work: 6.0 },      
        {task_id: 4, task_name: 'Compile user information and distribute to team', hours_work: 2.0 },
        {task_id: 5, task_name: 'Gather client product information', hours_work: 2.0 },  
        {task_id: 6, task_name: 'Create database', hours_work: 1.0 },
        {task_id: 7, task_name: 'Make new server routes', hours_work: 2.0 },
      ]);
    });
};
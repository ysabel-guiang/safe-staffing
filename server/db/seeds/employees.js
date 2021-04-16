exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        {employee_id: 201, name: 'Marge Simpson', team_id: 102, role: 'Graphic Designer', email: 'm.simpson@gmail.com', contact:'021537283', hours: 6.0 },
        {employee_id: 202, name: 'George Washington', team_id: 101, role: 'Graphic Designer', email: 'g.wash@gmail.com', contact:'021534283', hours:0 },
        {employee_id: 203, name: 'Sabrina Salem', team_id: 101, role: 'Marketing Manager', email: 's.witch@gmail.com', contact:'021535283', hours:0 },
        {employee_id: 204, name: 'Brad Pitt', team_id: 102, role: 'Marketing Manager', email: 'brad@gmail.com', contact:'021535583', hours:0 },
        {employee_id: 205, name: 'Joy Cowley', team_id: 102, role: 'Developer', email: 'joyc@gmail.com', contact:'021525283', hours:0 },
        {employee_id: 206, name: 'Liam Neeson', team_id: 101, role: 'Developer', email: 'liam.n@gmail.com', contact:'021525273', hours:0 },
        {employee_id: 207, name: 'Melissa Ravencroft', team_id: 101, role: 'Product Manager', email: 'melissa.rav@gmail.com', contact:'02123583', hours: 0 }, 
        {employee_id: 208, name: 'Jerimiah Bullfrog', team_id: 102, role: 'Product Manager', email: 'bullfrog@gmail.com', contact:'022023583', hours: 0 },
        {employee_id: 209, name: 'Hayley Williams', team_id: 102, role: 'Project Manager', email: 'yelyah@gmail.com', contact:'021023583', hours: 0 }, 
        {employee_id: 210, name: 'Robert Williams', team_id: 101, role: 'Project Manager', email: 'robby.w@gmail.com', contact:'021323583', hours: 0 }, 
        {employee_id: 211, name: 'Taylor Kennedy', team_id: 101, role: 'Developer', email: 'taylor@gmail.com', contact:'0201323583', hours: 0 }, 
        {employee_id: 212, name: 'Dave Franco', team_id: 102, role: 'Developer', email: 'franco@gmail.com', contact:'0201363583', hours: 0 }, 

      ]);
    });
};
const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTeams,
  getEmployees
  
}

function getAllTeams (db = connection) {
  return db('teams').select('team_id as teamId', 'team_name as teamName', 'description')
}

function getEmployees (team_id, db = connection) {
  return db('employees')
  .where('team_id', team_id)
  .select('employee_id as employeeId', 'name', 'role', 'email', 'contact', 'hours')
}
const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTeams,
  getEmployees,
  addTeam,
  addEmployee,
  addTask,
  addEmployeesAndTasks,
  getEmployee,
  updateEmployeeHours
  
}

function getAllTeams (db = connection) {
  return db('teams').select('team_id as teamId', 'team_name as teamName', 'description')
}

function getEmployees (team_id, db = connection) {
  return db('employees')
    .where('team_id', team_id)
    .select('employee_id as employeeId', 'name', 'role', 'email', 'contact', 'hours')
}

function addTeam (team_name, description, db = connection) {
  return db('teams').insert({
    team_name,
    description
  })
} 

function addEmployee (team_id, name, role, email, contact, db = connection) {
  return db('employees').insert({
    team_id,
    name,
    role,
    email,
    contact,
    hours: 0 
  })
}

function addTask (task_name, hours_work, urgency, db = connection) {
  return db('tasks').insert({
    task_name,
    hours_work,
    urgency
  })
}

function addEmployeesAndTasks (task_id, [employees], db = connection) {
  return db('employees_tasks').insert(
    employees.map(employeeId => {
      return {
        task_id,
        employee_id: employeeId
      }})
  )
}

function getEmployee ([name], db = connection) {
  return('employees')
    .whereIn('name', name)
    .select('employee_id as employeeId', 'name', 'role', 'email', 'contact', 'hours')
}

function updateEmployeeHours ([id], hours, db = connection) {
  return('employees')
  .whereIn('employee_id', '=', id)
  .increment('hours', hours)
}


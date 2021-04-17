const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = {
  getAllTeams
  
}

function getAllTeams (db = connection) {
  return db('teams').select('team_id as teamId', 'team_name as teamName', 'description')
}
import request from 'superagent'

const teamUrl = '/api/v1/teams/'

export function getTeams() {
  return request
    .get(teamUrl)
    .then(res => res.body)
}
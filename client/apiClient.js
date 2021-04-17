import request from 'superagent'

const teamUrl = '/api/v1/teams/'

export function getTeams() {
  return request
    .get(teamUrl)
    .then(res => res.body)
}

export function getTeamMembers(teamId) {
  return request
    .get(teamUrl + teamId)
    .then(res => res.body)
}


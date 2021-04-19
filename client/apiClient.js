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

export function addTeam (teamInfo) {
  return request
  .post(teamUrl)
  .send(teamInfo)
}

export function addMember (teamId, memberInfo) {
  return request
  .post(teamUrl + teamId)
  .send(memberInfo)
}

export function addTask (taskInfo) {
  return request
    .post(teamUrl + 'task')
    .send(taskInfo)
}
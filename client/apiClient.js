import request from 'superagent'

const teamUrl = '/api/v1/teams/'

export function getTeams() {
  return request.get(teamUrl).then((res) => res.body)
}

export function getTeamMembers(teamId) {
  return request.get(teamUrl + teamId).then((res) => res.body)
}

export function addTeam(teamInfo) {
  return request.post(teamUrl).send(teamInfo)
}

export function addMember(teamId, memberInfo) {
  return request.post(teamUrl + teamId).send(memberInfo)
}

export function addTask(teamId, taskInfo) {
  return request.post(teamUrl + teamId + '/task').send(taskInfo)
}

export function updateHours(teamId, taskInfo) {
  return request.patch(teamUrl + teamId + '/task').send(taskInfo)
}

export function getEmployee(teamId, employeeId) {
  return request
    .get(teamUrl + teamId + '/' + employeeId)
    .then((res) => res.body)
}

export function updateEmployee(employeeInfo, teamId) {
  return request
    .patch(teamUrl + teamId + '/' + employeeInfo.employeeId)
    .send(employeeInfo)
}

export function deleteEmployee(employeeId, teamId) {
  return request
    .delete(teamUrl + teamId + '/' + employeeId)
    .then((res) => res.body)
}

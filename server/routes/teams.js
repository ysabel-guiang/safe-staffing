const express = require('express')
const router = express.Router()

const db = require('../db/db')

router.get('/', async (req, res) => {
  try {
    const teams = await db.getAllTeams()
    res.json(teams)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params
    const employees = await db.getEmployees(teamId)
    res.json(employees)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/', async (req, res) => {
  try {
    const { teamName, description, name, role, email, contact } = req.body
    const newTeamId = await db.addTeam(teamName, description)[0]
    await db.addEmployee(newTeamId, name, role, email, contact)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/:teamId', async (req, res) => {
  try {
    const { teamId } = req.params
    const { name, role, email, contact } = req.body
    await db.addEmployee(teamId, name, role, email, contact)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.post('/:teamId/task', async (req, res) => {
  try {
    const { taskName, hoursWork, urgency, employees } = req.body

    const taskId = await db.addTask(taskName, hoursWork, urgency)[0]
    await db.addEmployeesAndTasks(taskId, employees)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/:teamId/task', (req, res) => {
  const { hoursWork, urgency, employees } = req.body
  const hoursEach = findHours(hoursWork, urgency, employees)

  Promise.all(
    employees.map((employeeId) => db.updateEmployeeHours(employeeId, hoursEach))
  )
    .then(() => {
      res.status(200).send()
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

router.get('/:teamId/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params
    const employee = await db.getEmployee(employeeId)
    res.json(employee)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/:teamId/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params
    const { name, role, email, contact } = req.body

    await db.updateEmployee(employeeId, name, role, email, contact)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/:teamId/:employeeId', async (req, res) => {
  try {
    const { employeeId } = req.params
    await db.deleteEmployee(employeeId)
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router

function findHours(hours, urgency, employeeArr) {
  return Number((Number(hours) + Number(urgency)) / employeeArr.length)
}

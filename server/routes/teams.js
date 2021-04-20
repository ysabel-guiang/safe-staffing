const express = require('express')
const router = express.Router()

const db = require('../db/db')

router.get('/', (req, res) => {
  db.getAllTeams()
    .then(teams => {
      res.json(teams)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
  }
)

router.get('/:teamId', (req,res) => {
  const { teamId } = req.params
  db.getEmployees(teamId)
    .then(employees => {
      res.json(employees)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.post('/', (req,res) => {
  const { teamName, description, name, role, email, contact } = req.body
  db.addTeam(teamName, description)
  .then(id => { 
    db.addEmployee(id[0], name, role, email, contact)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
})

router.post('/:teamId', (req,res) => {
  const { teamId } = req.params
  const { name, role, email, contact } = req.body

  db.addEmployee(teamId, name, role, email, contact)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.get ('/:teamId/task', (req,res) => {
  res.send('hello')
  return null
})

router.post('/:teamId/task', (req,res) => {
  
  const {taskName, hoursWork, urgency, employees} = req.body

  db.addTask(taskName, hoursWork, urgency)
    .then(taskId => {
  
      db.addEmployeesAndTasks(taskId[0], employees)
        .then(() => {
          res.status(200).send()
        })
      .catch(err => {
        res.status(500).send(err.message)
      })

    })
    .catch(err => {
      res.status(500).send(err.message)
    })
})

router.patch('/:teamId/task', (req,res) => {
  const {hoursWork, urgency, employees} = req.body
  const hoursEach = findHours(hoursWork,urgency, employees)

  employees.map(employeeId => {
    return db.updateEmployeeHours(employeeId, hoursWork)
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
  })
  res.status(200).send()
  
})




module.exports = router

function findHours (hours, urgency, employeeArr) {
  return Number((Number(hours) + Number(urgency)) / employeeArr.length)
}

function updateHours () {

  for(let i = 0; i < employeeArr.length; i++) {

    db.updateEmployeeHours(employeeIdArr[i], hoursWork)
    .then(() => {
      res.status(200).send()
      trial([i+1], hoursWork)
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
  }
}

function trial (id, hoursWork) {

  db.updateEmployeeHours(id, hoursWork)
    .then(() => {
      res.status(200).send()
      updateHours()
    })
    .catch(err => {
      res.status(500).send(err.message)
    })
}


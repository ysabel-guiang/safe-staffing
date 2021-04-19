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

module.exports = router

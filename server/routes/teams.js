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

module.exports = router

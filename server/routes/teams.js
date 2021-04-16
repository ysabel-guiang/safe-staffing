const express = require('express')
const router = express.Router()

const db = require('../db/db')

router.get('/', (req, res) => {
    res.send('hello world')
  }
)

module.exports = router

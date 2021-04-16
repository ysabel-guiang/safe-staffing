const path = require('path')
const express = require('express')
const cors = require('cors')

const server = express()

const teams = require('./routes/teams')

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))
server.use(cors('*'))

server.use('/api/v1/teams', teams)

module.exports = server

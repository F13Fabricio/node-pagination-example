'use strict'
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./routes')

class App {
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(cors({ origin: true }))
    this.express.use(morgan('dev'))
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = new App().express

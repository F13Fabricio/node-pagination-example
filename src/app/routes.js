'use strict'
const { Router } = require('express')
const citiesController = require('./controllers/citiesController')

const routes = Router()

routes.get('', (req, res) => res.status(200).send({ message: 'Ok' }))

routes.post('/cities', citiesController.create)

module.exports = routes

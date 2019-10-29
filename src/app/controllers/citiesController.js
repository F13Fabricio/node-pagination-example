'use strict'
const { City } = require('../models')

class CitiesController {
  async create(req, res) {
    try {
      const { name, description } = req.body
      let city = await City.create({ name, description })
      
      return res.status(200).send({ data: city })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  async index(req, res) {
    try {
      
    } catch (error) {
      
    }
  }

}

module.exports = new CitiesController()

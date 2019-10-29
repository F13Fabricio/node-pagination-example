'use strict'
const { City } = require('../models')

class CitiesController {
  constructor() {
    this.index = this.index.bind(this)
  }

  async create(req, res) {
    try {
      const { name, description } = req.body
      let city = await City.create({ name, description })
      
      return res.status(201).send({ data: city })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  async index(req, res) {
    try {
      let count = await City.count()
      const limit = +req.query.limit || 0
      const page = +req.query.page || 1
      const offset = limit * (page -1)

      if (page < 1 || page > this.numPages(count, limit)) {
        return res.status(400).send({ error: 'Invalid page number.'})
      }
      if (limit == 0) {
        const cities =await City.findAll()
        return res.status(200).send({count, data: cities })
      } else {
        const cities = await City.findAll({ offset, limit })
        let metaData = this.paginationMetaData(count, limit, page)
        return res.status(200).send({ ...metaData, data: cities })
      }

    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

  paginationMetaData(count, limit, page) {
    return {
      count,
      limit,
      numPages: this.numPages(count, limit),
      next: this.nextPageUrl(count, limit, page),
      prev: this.prevPageUrl(limit, page),
    }
  }

  nextPageUrl(count, limit, page) {
    let numPages =  this.numPages(count, limit)
    return (page < numPages) ? `/cities?limit=${limit}&page=${page + 1}` : null
  }

  numPages(count, limit) {
    return Math.ceil(count / limit)
  }

  prevPageUrl(limit, page) {
    return (page > 1) ? `/cities?limit=${limit}&page=${page - 1}` : null
  }

}

module.exports = new CitiesController()

'use strict'

// Calling dependencies
const path = require('path');
const fs = require('fs');

// Import database module connection
const model = require('../models/changes');
// Import lib module
const lib = require('../lib/lib');


/**
 * Function getRatings() rating messages
 * - Get all rating messages
 */
const getChanges = (req, res) => {
  model.getChanges(function (err, body) {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' })
    } else {
      if (!body) {
        res.status(404).send({ message: 'The http request could not be completed' })
      } else {
        res.status(200).send(body);
      }

    }

  })

};


/**
 * Function insert new Rating value
 * @param {*object} req
 * @param {*object} res
 */
const insertChange = (req, res) => {
  let changeOrder = req.body;
  console.log(req.body)

  model.insertChange(changeOrder, (err, data) => {
    if (err) {
      res.status(500).send({
        message: 'Error saving the change request!'
      })
    } else {
      if (!data && !data.rating_id) {
        res.status(404).send({ message: 'The change request could not be saved!' })
      } else {
        res.status(200).send(data);
      }
    }

  })

}

const demo = (req, res) => {
  console.log(req.body);
  res.status(200).send({message: "Hola fea"})
}
module.exports = {
  getChanges,
  insertChange,
  demo
}
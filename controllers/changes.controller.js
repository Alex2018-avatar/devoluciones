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
const getChangexchanges = (req, res) => {
  model.getChangexchanges(function (err, changexchanges) {
    if (err) {
      res.status(500).send({ message: 'Error en la peticion' })
    } else {
      if (!changexchanges) {
        res.status(404).send({ message: 'The http request could not be completed' })
      } else {
        changexchanges.map(resp => {
          resp.products = JSON.parse(resp.productItems);
          delete resp["productItems"]
        });
        res.status(200).send({ changexchangesview: changexchanges, totalMatches: changexchanges.length});
      }
    }
  })
};


/**
 * Function insert new Rating value
 * @param {*object} req
 * @param {*object} res
 */
const insertChangexchanges = (req, res) => {
  let changexchanges = req.body;

  if (lib.validate(changexchanges)) {
    model.insertChangexchanges(changexchanges, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'Error saving the change request!' })
      } else {
        if (data.hasOwnProperty('_error')) {
          res.status(404).send({ message: 'The data entered is not correct verify the database documentation', status_error: [data] })
        } else {
          if (!data && !data.rating_id) {
            res.status(404).send({ message: 'The change request could not be saved!' })
          } else {
            res.status(200).send({ changexchangesview: data, typeModule: changexchanges.typeModule });
          }
        }
      }
    })
  } else {
    res.status(400).send({ message: 'Not all parameters were found, Complete all fields', suggestion: 'Verify that all fields are full' });
  }
}

/**
 * Function getChangesByRut()
 * - get all Returns & Exchanges
 * @param {*integer||numer} rut: user rut for search and filter 
 */
const getChangexchangesByRut = (req, res) => {
  let rutuser = req.params.rut;
  model.getChangexchangesByRut(rutuser, (err, changexchanges) => {
    if (err) {
      res.status(500).send({ message: 'Error in the request, try again!' })
    }else{
      if (!changexchanges) {
        res.status(404).send({ message: 'The system does not resolve the request.!' })
      } else {
        if (changexchanges.length == 0) {
          res.status(200).send({ message: `Could not find any data for: ${rutuser}` });
        } else {
          res.status(200).send({ changexchangesview: changexchanges, totalMatches: changexchanges.length });
        }
      }
    }
  })
}
/**
 * Function getChangesByiD()
 * - get All changes by changeId
 * @param {*number||integer} requestID: parameter for request
 */
const getChangexchangesById = (req, res) => {
  var requestID = req.params.changeId;
  model.getChangexchangesById(requestID, (err, changexchanges) => {
    if (err) {
      res.status(500).send({message: 'Error in the request, try again!'})
    }else{
      if (!changexchanges) {
        res.status(404).send({ message: 'The system does not resolve the request.!' })
      }else{
        if (changexchanges.length == 0) {
          res.status(200).send({ message: `Could not find any data for: ${changeId}` });
        }else{
          changexchanges.map(element => {
            element.products = JSON.parse(element.productItems);
            delete element["productItems"]
          });
          res.status(200).send({ changexchangesview: changexchanges, totalMatches: changexchanges.length });
        }

      }

    }

  })
  
};
/**
 * Function getChangexchangeByDate()
 * - get all Returns & Exchanges by date
 * @param {*string} date: Returns & Exchanges  for request
 */
const getChangexchangeByDate = (req, res) => {
  var changexchangesDate = req.params.date;
  let expression = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  if (expression.test(changexchangesDate)) {
    model.getChangexchangeByDate(changexchangesDate, (error, changexchanges) => {
      if (error) {
        res.status(500).send({ message: 'Error in the request, try again!' })
      } else {
        if (!changexchanges) {
          res.status(404).send({ message: 'The system does not resolve the request.!' })
        } else {
          res.status(200).send({ changexchangesview: changexchanges, totalMatches: changexchanges.length });
        }
      }
    })
  } else {
    res.status(400).send({
      message: 'The format of the date parameter is not correct', 
      suggestion: 'Use the format: yyyy-mm-dd (2018 - 12 - 02)' 
    });
  }  
};

const getChangexchangeByRangeDate = (req, res) => {
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;
  let expression = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
  if (expression.test(startDate) && expression.test(endDate)) {
    if (lib.validateDateRange(startDate, endDate)) {
      model.getChangexchangeByRangeDate(startDate, endDate, (error, changexchanges) => {
        if (error) {
          res.status(500).send({ message: 'Error in the request, try again!' })
        } else {
          if (!changexchanges) {
            res.status(404).send({ message: 'The system does not resolve the request.!' })
          } else {
            res.status(200).send({ changexchangesview: changexchanges, totalMatches: changexchanges.length });
          }
        }
      })
    }else{
      res.status(400).send({
        message: 'The start date can not be longer than the end date',
        suggestion: 'yyyy-mm-dd(startDate) < yyyy-mm-dd(endDate)'
      });
    }
  }else{
    res.status(400).send({
      message: 'The format of the date parameter is not correct',
      suggestion: 'Use the format: yyyy-mm-dd (2018 - 12 - 02)'
    });
  }
}

const getChangexchangeByModule = (req, res) => {
  let moduleType = req.params.module;
  console.log(moduleType);
  res.status(200).send({message: 'Hoa lol'})
}
module.exports = {
  getChangexchanges,
  insertChangexchanges,
  getChangexchangesById,
  getChangexchangesByRut,
  getChangexchangeByDate,
  getChangexchangeByRangeDate,
  getChangexchangeByModule
}
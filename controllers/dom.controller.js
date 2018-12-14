'use strict'

// Calling dependencies
const fs = require('fs');
//const jsonexport = require('jsonexport');


// Import lib module
const lib = require('../lib/lib');

/**
 * Function build and serve DOM for menuLeft navigations
 */
const getDOMforLeftNavigation = async (req, res) => {
  try {
    let filePath = 'views/html/fielsed_menu.html';
    // Check that the file exists locally
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ code: 'INTERNAL_ERROR', message: 'File doesn\'t exists', sugges: 'Please reload the page or contact support.' });
      lib.createRWDOMLeftNavigation();
    } else {
      var contents = await fs.readFileSync(filePath, 'utf8');
      if (!contents) {
        res.status(404).send({
          code: 'REQUEST_ERROR', message: 'I can\'t complete the request'
        })
      } else {
        res.status(200).send({ navview: contents });
        //res.render('./forms/order_list')
      }

    }
  } catch (error) {
    throw new Error('Request failure: ' + error.message)
  }
};

/**
 * Function build and serve Main DOM for order list view
 */
const getDOMforOrderList = async(req, res) => {
  try {
    let filePath = 'views/html/order_list.html';
    // Check that the file exists locally
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ code: 'INTERNAL_ERROR', message: 'File doesn\'t exists', sugges: 'Please reload the page or contact support.' });
      lib.createRWDOMOrderList();
    } else {
      var contents = await fs.readFileSync(filePath, 'utf8');
      if (!contents) {
        res.status(404).send({
          code: 'REQUEST_ERROR', message: 'I can\'t complete the request'
        })
      } else {
        res.status(200).send({ ordeview: contents });
        //res.render('./forms/order_list')
      }

    }
  } catch (error) {
    throw new Error('Request failure: '+ error.message)
  }
  
}
//./catalog/products
const getDOMforOrderDetail = async (req, res) => {
  try {
    let filePath = 'views/html/order_detail.html';
    // Check that the file exists locally
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ code: 'INTERNAL_ERROR', message: 'File doesn\'t exists', sugges: 'Please reload the page or contact support.' });
      lib.createRWDOMOrderDetail();
    } else {
      var contents = await fs.readFileSync(filePath, 'utf8');
      if (!contents) {
        res.status(404).send({
          code: 'REQUEST_ERROR', message: 'I can\'t complete the request'
        })
      } else {
        res.status(200).send({ detailview: contents });
        //res.render('./forms/order_list')
      }

    }
  } catch (error) {
    throw new Error('Request failure: ' + error.message)
  }

}


const getDOMforOrderChange= async (req, res) => {
  try {
    let filePath = 'views/html/change_prod.html';
    // Check that the file exists locally
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ code: 'INTERNAL_ERROR', message: 'File doesn\'t exists', sugges: 'Please reload the page or contact support.' });
      lib.createRWDOMOrderChange();
    } else {
      var contents = await fs.readFileSync(filePath, 'utf8');
      if (!contents) {
        res.status(404).send({
          code: 'REQUEST_ERROR', message: 'I can\'t complete the request'
        })
      } else {
        res.status(200).send({ changeview: contents });
      }
    }
  } catch (error) {
    throw new Error('Request failure: ' + error.message)
  }
}

/**
 * Function 
 * @param {*} req 
 * @param {*} res 
 */
const getDOMforOrderExchange = async(req, res) => {
  try {
    let filePath = 'views/html/exchange_form.html';
    // Check that the file exists locally
    if (!fs.existsSync(filePath)) {
      res.status(404).send({ code: 'INTERNAL_ERROR', message: 'File doesn\'t exists', sugges: 'Please reload the page or contact support.' });
      lib.createRWDOMOrderExchange();
    } else {
      var contents = await fs.readFileSync(filePath, 'utf8');
      if (!contents) {
        res.status(404).send({
          code: 'REQUEST_ERROR', message: 'I can\'t complete the request'
        });
      } else {
        res.status(200).send({ exchange: contents });
      }
    }
  } catch (error) {
    throw new Error('Request failure: ' + error.message)
  }
}
module.exports = {
  getDOMforLeftNavigation,
  getDOMforOrderList,
  getDOMforOrderDetail,
  getDOMforOrderChange,
  getDOMforOrderExchange
};
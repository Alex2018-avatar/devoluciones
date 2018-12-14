'use strict'

// Calling dependencies
const express = require("express");
const router = express.Router();

/** Calling controllers */
// DOM controllers
const DOMController = require('../controllers/dom.controller');

/**
 * // Mapping routes
 * ---------------------------------------------------
 * - formview             => GET : get HTML for order List
                 
 */
router.get('/leftnaview', DOMController.getDOMforLeftNavigation);
router.get('/orderview', DOMController.getDOMforOrderList);
router.get('/orderdetail', DOMController.getDOMforOrderDetail);
router.get('/changeview', DOMController.getDOMforOrderChange);
router.get('/exchangeview', DOMController.getDOMforOrderExchange);
module.exports = router
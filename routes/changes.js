'use strict'

// Calling dependencies
const express = require("express");
const router = express.Router();


/** Calling controllers */
// Ratings controllers
const ChangexchangesviewController = require('../controllers/changes.controller');


/**
 * // Mapping routes
 * ---------------------------------------------------
 * - changesviews               => GET : get all changes 
 * - ratingview/byId            => GET : get rating by productId
 * - download/byDomain          => GET : download attributes file in scv format                   
 */

router.get('/changexchangesview', ChangexchangesviewController.getChangexchanges);
router.post('/changexchange', ChangexchangesviewController.insertChangexchanges);
router.get('/changexchangesview/byId/:changeId', ChangexchangesviewController.getChangexchangesById);
router.get('/changexchangesview/byRut/:rut', ChangexchangesviewController.getChangexchangesByRut);
router.get('/changexchangesview/byDate/:date', ChangexchangesviewController.getChangexchangeByDate);
router.get('/changexchangesview/byDateRange/:startDate/:endDate', ChangexchangesviewController.getChangexchangeByRangeDate);
router.get('/changexchangesview/byModule/:module', ChangexchangesviewController.getChangexchangeByModule);
module.exports = router;

'use strict'

// Calling dependencies
const express = require("express");
const router = express.Router();


/** Calling controllers */
// Ratings controllers
const ChangeController = require('../controllers/changes.controller');


/**
 * // Mapping routes
 * ---------------------------------------------------
 * - changesviews               => GET : get all changes 
 * - ratingview/byId            => GET : get rating by productId
 * - download/byDomain          => GET : download attributes file in scv format                   
 */

router.get('/changesview', ChangeController.getChanges);
router.post('/changes', ChangeController.insertChange);
router.post('/demo', ChangeController.demo);
module.exports = router;
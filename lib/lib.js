'use strict'

// Calling dependencies
const fs = require('fs');
const pug = require('pug');


/**
 * Function to render a create a rating file .html
 */
function createRWDOMLeftNavigation() {
  let content = pug.renderFile('./views/forms/fielsed_menu.pug');
  fs.writeFile('./views/html/fielsed_menu.html', (null, 4, content), () => {
    console.log('File created successfully!');
  });
}
/**
 * Function to render a create a rating file .html
 */
function createRWDOMOrderList() {
  let content = pug.renderFile('./views/forms/order_list.pug');
  fs.writeFile('./views/html/order_list.html', (null, 4, content), () => {
    console.log('File created successfully!');
  });
}

function createRWDOMOrderDetail() {
  let content = pug.renderFile('./views/forms/order_detail.pug');
  fs.writeFile('./views/html/order_detail.html', (null, 4, content), () => {
    console.log('File created successfully!');
  });
}

function createRWDOMOrderChange() {
  let content = pug.renderFile('./views/forms/change_prod.pug');
  fs.writeFile('./views/html/change_prod.html', (null, 4, content), () => {
    console.log('File created successfully!');
  });
}

function createRWDOMOrderExchange() {
  let content = pug.renderFile('./views/forms/exchange_form.pug');
  fs.writeFile('./views/html/exchange_form.html', (null, 4, content), () => {
    console.log('File created successfully!');
  });
}

function validate(changexchanges){
  if (!changexchanges.orderId) 
    return false; 
  if (!changexchanges.username) 
    return false;
  if (!changexchanges.addressLine) 
    return false;
  if (!changexchanges.commune) 
    return false;
  if (!changexchanges.region) 
    return false;
  if (!changexchanges.country)
    return false;
  if (!changexchanges.phone) 
    return false;
  if (!changexchanges.email) 
    return false;
  if (!changexchanges.amountOrder) 
    return false;
  if (!changexchanges.productItems) 
    return false;
  if (!changexchanges.rut) 
    return false;
  if (!changexchanges.typeModule) 
    return false;

  return true;
}

function validateDateRange(startDate, endDate) {
  let valuesStart = startDate.split("-");
  let valuesEnd = endDate.split("-");

  // verify that the date is not later than the current one
  var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
  var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);

  return (dateStart >= dateEnd) ? false : true;
}

module.exports = {
  createRWDOMLeftNavigation,
  createRWDOMOrderList,
  createRWDOMOrderDetail,
  createRWDOMOrderChange,
  validate,
  validateDateRange,
  createRWDOMOrderExchange
}
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
module.exports = {
  createRWDOMLeftNavigation,
  createRWDOMOrderList,
  createRWDOMOrderDetail,
  createRWDOMOrderChange
}
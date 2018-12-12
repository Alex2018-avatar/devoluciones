'use strict'

// Calling dependencies
const pool = require('./database');


/**
 * Function get getRatings
 * - model function for get all rating messages
 * @param {*function} callback 
 */
const getChanges = async (callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM tb_changes");
    callback(null, rows);
  } catch (err) {
    console.log('Error de conexion: MySQL-> %s', err);
    //throw err;
  } finally {
    if (conn) return conn.end();
  }
};


/**
 * Add a new rating message
 * @param {*object} ratingData: data rating for insetr
 * @param {*object} callback: callback function
 */
const insertChange = async (body, callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `INSERT INTO tb_changes 
              (orderId,username,addressLine,commune,region,country,
               phone,email,courier,productId,partNumber,skuId,size, color,reazonChange,price) 
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const res = await pool.query(sql, [
      body.orderId,
      body.username,
      body.addressLine,
      body.commune,
      body.region,
      body.country,
      body.phone,
      body.email,
      body.courier,
      body.productId,
      body.partNumber,
      body.skuId,
      body.size,
      body.color,
      body.reazonChange,
      body.price]);
    callback(null, { "insertId": res.insertId, 'affectedRows': res.affectedRows });
  } catch (err) {
    console.log('Error de conexion: MySQL-> %s', err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

module.exports = {
  getChanges,
  insertChange
}
'use strict'

// Calling dependencies
const pool = require('./database');


/**
 * Function get getChangexchanges()
 * - model function for get all rating messages
 * @param {*function} callback 
 */
const getChangexchanges = async (callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM changexchanges_tb");
    callback(null, rows);
  } catch (err) {
    console.log('Error de conexion: MySQL-> %s', err);
  } finally {
    if (conn) return conn.end();
  }
};


/**
 * Function insertChangexchanges()
 * - Add a new rating message
 * @param {*object} body: data of new Return & Exchange
 * @param {*function} callback
 */
const insertChangexchanges = async (body, callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `INSERT INTO changexchanges_tb 
              (orderId,username,addressLine,commune,region,country,productItems,
               phone,email,rut,courier,amountOrder,typeModule) 
               VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const res = await pool.query(sql, [
      body.orderId,
      body.username,
      body.addressLine,
      body.commune,
      body.region,
      body.country,
      body.productItems,
      body.phone,
      body.email,
      body.rut,
      body.courier,
      body.amountOrder,
      body.typeModule]);
    callback(null, { "_uniqueId": res.insertId, 'affectedRows': res.affectedRows });
  } catch (err) {
    console.log('Error de conexion: MySQL-> %s', err);
    callback(null, { "_error": err });
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

/**
 * Function get getChangesByRut()
 * - model function for get all changes by current user rut
 * @param {*string} rut: current user rut
 * @param {*function} callback
 */
const getChangexchangesByRut = async (rut, callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `select _uniqueID, changeState, changeDate, typeModule, orderId 
               from changexchanges_tb
               where rut = ?`;
    const rows = await conn.query(sql, [rut]);
    callback(null, rows);
  } catch (err) {
    console.log('Error de conexion: MySQL-> %s', err.message);
  } finally {
    if (conn) return conn.end();
  }
};

/**
 * Function getChangesById()
 * - get all Returns & Exchanges by uniqueId
 * @param {*number||integer} _uniqueID: Returns & Exchanges uniqueID for search
 * @param {*function} callback 
 */
const getChangexchangesById = async (_uniqueID, callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `select * from changexchanges_tb 
               where _uniqueID = ?`;
    const rows = await conn.query(sql, [_uniqueID]);
    callback(null, rows);
  } catch (error) {
    console.log('Error de conexion: MySQL-> %s', err);
  } finally {
    if (conn) return conn.end();
  }
}
/**
 * function getChangexchangeByDate()
 * - get all Returns & Exchanges by date
 * @param {*string} changexchangesDate: date for filter request
 * @param {*function} callback 
 */
const getChangexchangeByDate = async(changexchangesDate, callback) =>{
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `select orderId,username,addressLine,commune,region,country,
               phone,email,rut,courier,amountOrder,typeModule 
               from changexchanges_tb
               where date(changeDate) = ?;`;
    const rows = await conn.query(sql, [changexchangesDate]);
    callback(null, rows);
  } catch (error) {
    console.log('Error de conexion: MySQL-> %s', err.message);
  }finally{
    if (conn) return conn.end();
  }
};
/**
 * Function getChangexchangeByRangeDate()
 * - get all Returns & Exchanges by range date
 * @param {*string} startDate: date for filter request
 * @param {*string} endDate: date for filter request
 * @param {*function} callback 
 */
const getChangexchangeByRangeDate = async(startDate, endDate, callback) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let sql = `select orderId,username,addressLine,commune,region,country,
               phone,email,rut,courier,amountOrder,typeModule
               from changexchanges_tb
               where date(changeDate)  between ? and ?`;
    const rows = await conn.query(sql, [startDate, endDate]);
    callback(null, rows);
  } catch (e) {
    console.log('Connection errorL MySQL -> %s', e.message)
  } finally {
    if (conn) return conn.end();
  }
}

const getChangexchangeByModule = (moduleType, callback) => {
  let conn;
  try {
    
  } catch (error) {
    console.log('Connection errorL MySQL -> %s', e.message)
  } finally {
    if (conn) return conn.end();
  }
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
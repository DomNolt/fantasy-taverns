//const validator = require('validator');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');

const getAllTaverns = async function(req) {
    const pool = await poolPromise;
    let result;

    try {
        result = await pool
        .request()
        .query('SELECT * FROM Taverns');
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset;
};

getAll = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, Taverns;

    // now call the db
    [err, Taverns] = await executeOrThrow(getAllTaverns(req));
    if (err) {
        return returnError(res, err, 422);
    }
    // return results
    return returnSuccessResponse(res, Taverns, 202);
};

module.exports.getAll = getAll;



const getUserTavern = async function(req) {
    const pool = await poolPromise;
    let result;

    try {
        result = await pool
        .request()
        .input('TavernID', sql.Int, req.user.TavernID)
        .query('SELECT * FROM Taverns WHERE ID = @TavernID');
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset.shift();
};

getSingle = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, Tavern;

    // now call the db
    [err, Tavern] = await executeOrThrow(getUserTavern(req));
    if (err) {
        return returnError(res, err, 422);
    }
    // return results
    return returnSuccessResponse(res, Tavern, 202);
};

module.exports.getSingle = getSingle;
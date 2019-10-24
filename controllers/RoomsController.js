//const validator = require('validator');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');

const getAllRooms = async function(req) {
    const pool = await poolPromise;
    let result;

    try {
        result = await pool
        .request()
        .input('TavernID', sql.Int, req.user.TavernID)
        .query('SELECT * FROM Rooms WHERE TavernID = @TavernID');
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset;
};

getAll = async function(req, res) {
    // format request
    res.setHeader('ContentType', 'application/json');

    let err, Rooms;

    // now call the db
    [err, Rooms] = await executeOrThrow(getAllRooms(req));
    if (err) {
        return returnError(res, err, 422);
    }
    // return results
    return returnSuccessResponse(res, Rooms, 202);
};

module.exports.getAll = getAll;
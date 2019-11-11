//const validator = require('validator');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const { poolPromise } = require('../data/db');
const jwt = require('jsonwebtoken');

getAll = async function(req, res) {
    // format request
    let rooms;
    res.setHeader('Content-Type', 'application/json');
    const pool = await poolPromise;

    try {
        rooms = await pool
            .request()
            .input('RoomName', sql.VarChar, req.query.roomName)
            .input('TavernID', sql.Int, req.user.TavernID)
            .query(
                // eslint-disable-next-line quotes
                `SELECT * FROM Rooms Where TavernID = @TavernID and RoomName LIKE '%' + @RoomName + '%'`,
            );
        rooms = rooms.recordset;
    } catch (e) {
        returnError(res, e, 500);
    }

    return res.json(rooms);
};

module.exports.getAll = getAll;

/****************************** create room stuff **************************************/
const createRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    const pool = await poolPromise;

    try {
        room = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('DailyRate', sql.Money, body.DailyRate)
            .query(
                'INSERT INTO Rooms ([RoomName], [RoomStatus], [TavernID], [DailyRate]) OUTPUT inserted.* values (@RoomName, 1, @TavernID, @DailyRate)',
            );
        room = room.recordset.shift();
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};

module.exports.createRoom = createRoom;

/****************************** update room stuff **************************************/
const updateRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    const body = req.body;
    const pool = await poolPromise;

    try {
        room = await pool
            .request()
            .input('RoomName', sql.VarChar, body.RoomName)
            .input('DailyRate', sql.Money, body.DailyRate)
            .input('ID', sql.Int, body.ID)
            .query(
                'UPDATE Rooms SET RoomName = @RoomName, DailyRate = @DailyRate WHERE ID = @ID',
            );
    } catch (e) {
        returnError(res, e, 500);
    }

    return returnSuccessResponse(res, room, 201);
};

module.exports.updateRoom = updateRoom;
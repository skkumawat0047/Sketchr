const express = require('express');
const user_board_router = express.Router();

const {allboard} = require('../controllers/userboardcontroller')

user_board_router.get('/allboard/:userId', allboard);

module.exports = user_board_router;
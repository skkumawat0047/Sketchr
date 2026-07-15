const express = require('express');
const router = express.Router();

const {createBoard,getBoard} = require('../controllers/boardcontrollers');

router.post('/createboard',createBoard);
router.get('/:id',getBoard);

module.exports = router;
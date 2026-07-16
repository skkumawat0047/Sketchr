const express = require('express');
const router = express.Router();

const {createBoard,getBoard,updateBoard} = require('../controllers/boardcontrollers');

router.post('/createboard',createBoard);
router.get('/:id',getBoard);
router.put('/:id',updateBoard);

module.exports = router;
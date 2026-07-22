const express = require('express');
const router = express.Router();

const {
    createBoard,
    getBoard,
    updateBoard,
    starBoard,
    unstarBoard,
    moveToTrash,
    restoreBoard,
    deleteBoardPermanently
} = require('../controllers/boardcontrollers');

// CREATE (Yahan '/createboard' confirm kar lein ki match ho raha hai)
router.post('/createboard', createBoard);

// STAR / UNSTAR
router.put('/star/:id', starBoard);
router.put('/unstar/:id', unstarBoard);

// TRASH / RESTORE
router.put('/trash/:id', moveToTrash);
router.put('/restore/:id', restoreBoard);

// GET BOARD
router.get('/:id', getBoard);

// UPDATE BOARD
router.put('/:id', updateBoard);

// DELETE FOREVER
router.delete('/:id', deleteBoardPermanently);

module.exports = router;
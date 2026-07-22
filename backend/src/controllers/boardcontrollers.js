const Canvas = require('../models/Canvas');

// CREATE
exports.createBoard = async (req, res) => {
    try {
        const board = await Canvas.create(req.body);

        res.status(201).json({
            _id: board._id
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET
exports.getBoard = async (req, res) => {
    try {
        const board = await Canvas.findById(req.params.id);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.json({
            _id: board._id,
            title: board.title,
            elements: board.elements
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

// UPDATE
exports.updateBoard = async (req, res) => {
    try {
        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            _id: board._id
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// MOVE TO TRASH
// MOVE TO TRASH
exports.moveToTrash = async (req, res) => {
    try {
        const userId = req.body.userId;

        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { deletedBy: userId }
            },
            { new: true }
        );

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            _id: board._id,
            deletedBy: board.deletedBy
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// RESTORE FROM TRASH
exports.restoreBoard = async (req, res) => {
    try {
        const userId = req.body.userId;

        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { deletedBy: userId }
            },
            { new: true }
        );

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            _id: board._id,
            deletedBy: board.deletedBy
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// STAR
exports.starBoard = async (req, res) => {
    try {
        const userId = req.body.userId;
        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { starredBy: userId } },
            { new: true }
        );
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UNSTAR
exports.unstarBoard = async (req, res) => {
    try {
        const userId = req.body.userId;
        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            { $pull: { starredBy: userId } },
            { new: true }
        );
        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.status(200).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PERMANENT DELETE
exports.deleteBoardPermanently = async (req, res) => {
    try {
        const board = await Canvas.findByIdAndDelete(req.params.id);

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        res.status(200).json({
            message: 'Board deleted permanently'
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
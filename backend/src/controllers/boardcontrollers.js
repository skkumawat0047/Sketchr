const Canvas = require('../models/Canvas')

exports.createBoard = async (req, res) => {
    try {
        const board = await Canvas.create(req.body);
        res.status(201).json({_id:board._id});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBoard = async (req, res) => {
    console.log("get request Hit");
    console.log(req.params.id);
    try {
        const board = await Canvas.findById(req.params.id);
        res.json({_id:board._id,title:board.title,elements:board.elements});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateBoard = async (req, res) => {
    try {
        const board = await Canvas.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!board)
            return res.status(404).json({ message: "Board not found" });
        res.status(201).json({_id:board._id});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

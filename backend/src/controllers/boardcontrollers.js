const Canvas = require('../models/Canvas')

exports.createBoard = async (req, res) => {
    try {
        const board = await Canvas.create(req.body);
        res.status(201).json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBoard = async (req, res) => {
    console.log("Controller Hit");
    console.log(req.params.id);

    try {
        const board = await Canvas.findById(req.params.id);
        res.json(board);
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

        res.json(board);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.getBoard = async (req, res) => {
//     try {
//         const board = await Canvas.findById(req.params.id);
//         console.log("hello I am getBoard");

//         if (!board)
//             return res.status(404).json({ message: "Board not found" });
//         res.json(board);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
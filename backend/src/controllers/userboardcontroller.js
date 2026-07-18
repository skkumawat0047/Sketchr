const Users = require("../models/Users");
const Canvas = require('../models/Canvas');

exports.allboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ownedBoards = await Canvas.find({
      owner: userId,
      $or: [{ deletedBy: { $exists: false } }, { deletedBy: { $size: 0 } }]
    });

    const starredBoards = await Canvas.find({
      starredBy: userId,
    });

    const sharedBoards = await Canvas.find({
      "collaborators.user": userId,
    });

    const trashBoards = await Canvas.find({
      owner: userId,
      deletedBy: userId,
    });

    res.json({ ownedBoards, starredBoards, sharedBoards, trashBoards });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
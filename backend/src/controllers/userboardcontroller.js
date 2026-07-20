const Users = require("../models/Users");
const Canvas = require('../models/Canvas');

exports.allboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    const ownedBoards = await Canvas.find({
      owner: userId,
      $or: [{ deletedBy: { $exists: false } }, { deletedBy: { $size: 0 } }]
    }).sort({updatedAt: -1});

    const starredBoards = await Canvas.find({
      starredBy: userId,
    }).sort({updatedAt: -1});

    const sharedBoards = await Canvas.find({
      "collaborators.user": userId,
    }).sort({updatedAt: -1});

    const trashBoards = await Canvas.find({
      owner: userId,
      deletedBy: userId,
    }).sort({updatedAt: -1});

    res.json({ ownedBoards, starredBoards, sharedBoards, trashBoards });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
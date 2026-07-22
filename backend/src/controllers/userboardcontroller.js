const Users = require("../models/Users");
const Canvas = require('../models/Canvas');

exports.allboard = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1. Owned boards (jo is user ne delete na kiye hon)
    const ownedBoards = await Canvas.find({
      owner: userId,
      deletedBy: { $ne: userId }
    }).sort({ updatedAt: -1 });

    // 2. Starred boards ('starredBy' use kiya hai jo schema me hai)
    const starredBoards = await Canvas.find({
      starredBy: userId,
      deletedBy: { $ne: userId }
    }).sort({ updatedAt: -1 });

    // 3. Shared boards
    const sharedBoards = await Canvas.find({
      "collaborators.user": userId,
      deletedBy: { $ne: userId }
    }).sort({ updatedAt: -1 });

    // 4. Trash boards
    const trashBoards = await Canvas.find({
      deletedBy: userId
    }).sort({ updatedAt: -1 });

    res.json({ ownedBoards, starredBoards, sharedBoards, trashBoards });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
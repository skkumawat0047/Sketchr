const Users = require("../models/Users");
const Canvas = require('../models/Canvas');

exports.allboard = async (req, res) => {
  try {
    const allboard = await Canvas.find({ owner: req.params.id });
    res.json(allboard);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
}
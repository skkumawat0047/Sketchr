const Users = require("../models/Users");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check email already exists
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = await Users.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
const express = require('express');
const user_route = express.Router();

const {register,loginUser} = require('../controllers/usercontroller');

user_route.post('/register',register);
user_route.post("/login", loginUser);

module.exports = user_route;
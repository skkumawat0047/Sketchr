const express = require('express');
const cors = require('cors');
require("dotenv").config();
require("./src/config/database");
const router = require('./src/routes/boardroutes');
const user_route = require('./src/routes/userroutes');
const user_board_router = require('./src/routes/userboard');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/boards", router);
app.use("/user", user_route);
app.use("/user/allboard", user_board_router);
app.get('/',(req,res)=>{
    res.send("Hello user!");
})
app.get('/test',(req,res)=>{
    res.send("user testing verified!");
})

app.listen(port,()=>{
    console.log("server is running properly!")
})
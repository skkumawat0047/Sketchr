const express = require('express');
const cors = require('cors');
const router = require('./src/routes/boardroutes');
const user_route = require('./src/routes/userroutes');
require("./src/config/database");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/boards", router);
app.use("/user", user_route);
app.get('/',(req,res)=>{
    res.send("Hello user!");
})
app.get('/test',(req,res)=>{
    res.send("user testing verified!");
})

app.listen(port,()=>{
    console.log("server is running properly!")
})
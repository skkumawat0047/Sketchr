const express = require('express');
const cors = require('cors');
const router = require('./src/routes/boardroutes');
require("./src/config/database");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/boards", router);

app.get('/',(req,res)=>{
    res.send("Hello user!");
})
app.get('/test',(req,res)=>{
    res.send("user testing verified!");
})

app.listen(port,()=>{
    console.log("server is running properly!")
})
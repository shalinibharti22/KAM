const express = require("express");
const cors = require("cors");
const app = express();
//routes
app.get('/',(req,res)=>{
    res.send("hello api")
})

app.listen(3000 ,() =>{
    console.log("listening");
})
"use strict"; //ECMA Script VS
const express = require("express");
const app = express();
const port = process.env.port || 4000;

//http://127.0.0.1:4000

app.get("/",(req,res) => {
    res.send("hello world");
    console.log('landing page');
});

//http://127.0.0.1:4000/things/houses
app.get("/things/houses",(req,res) => {
    res.send("hello world from things/houses");
    console.log('things houses page');
});


// Using Express framework routing
// app.route("/things/cars")
//     .get((req,res) => {//do something })
//     .post(req,res) => {//do something});

app.listen(port,err => {
    if(err){
        return console.log("Error",err);
    }
    console.log(`listening on port  ${port}`);
})
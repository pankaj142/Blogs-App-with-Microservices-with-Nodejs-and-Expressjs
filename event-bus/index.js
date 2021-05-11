const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());

app.use(bodyParser.json());
const posts = {}

app.post("/events", (req,res)=>{
    const event = req.body;
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);

    res.status({status : 'OK' });
})

app.listen(4005, () =>{
    console.log("Event Bus Service Listing on 4005")
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());

app.use(bodyParser.json());

// Data Store
const events = [];

//Listing for Events from Post Service and Comments Service
app.post("/events", (req,res)=>{
    const event = req.body;

    // Push the Event to Data Store
    events.push(event);

    axios.post("http://localhost:4000/events", event).catch((err) =>{
        console.log("event bus 1 err message ",err)
    });
    axios.post("http://localhost:4001/events", event).catch((err) =>{
        console.log("event bus 2 err message ",err)
    });
    axios.post("http://localhost:4002/events", event).catch((err) =>{
        console.log("event bus 3 err message ",err)
    });
    axios.post("http://localhost:4003/events", event).catch((err) =>{
        console.log("event bus 4 err message ",err)
    });

    console.log("event bus event process done")
    res.status({status : 'OK' });
})

//Send all Events from Data Store
app.get("/events", (req,res) =>{
    res.send(events);
})

app.listen(4005, () =>{
    console.log("Event Bus Service Listing on 4005")
})
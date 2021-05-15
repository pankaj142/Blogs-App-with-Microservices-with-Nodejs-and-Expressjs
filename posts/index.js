const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());
app.use(bodyParser.json());
const posts = {}
app.get("/posts", (req,res) =>{
    res.send(posts)
})

app.post("/posts", async(req,res)=>{
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;
    posts[id] = {
        id,title
    }

    //Emit Event
    await axios.post("http://event-bus-srv:4005/events", {
        type : "PostCreated",
        data : {
            id,title
        }
    }).catch((err) =>{
        console.log("post PostCreated err message ",err)
    });
    console.log("post new post api done")
    res.status(201).send(posts[id]);
})

//Receive Event From Event bus
app.post("/events", (req,res) =>{
    console.log("received event posts", req.body);
    res.send({});
})

app.listen(4000, () =>{
    console.log("Its updated Version 66")
    console.log("Post Service Listing on 4000")
})
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const {randomBytes} = require("crypto");
const { default: axios } = require("axios");

app.use(bodyParser.json());

//Receive CommentCreated Event From Event bus
app.post("/events", async(req,res) =>{
    console.log("received event posts", req.body);
    const {type, data} = req.body;
    if(type == "CommentCreated"){
        //if the comment contains the word "orange" then reject it, else approve it.
        const status = data.content.includes("orange") ? "rejected" : "approved";
        // Emit Event
        await axios.post("http://localhost:4005/events", {
            type : "CommentModerated",
            data : {
                id : data.id,
                postId : data.postId,
                status : status,
                content : data.content
            }
        }).catch((err) =>{
            console.log("moderation CommentCreated err message ",err)
        });
    }
    res.send({});
})

app.listen(4003, () =>{
    console.log("Moderation Service Listing on 4003")
})
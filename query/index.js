const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");

app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.get("/posts", (req,res) =>{
    res.send(posts)
})

const handleEvent = (type, data) =>{
    if(type === "PostCreated"){
        const {id, title} = data;
        posts[id] = {id, title, comments : []}
    }
    if(type === "CommentCreated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        post.comments.push({id, content, status})
    }
    if(type === "CommentUpdated"){
        const {id, content, postId, status} = data;
        const post = posts[postId];
        const comment = post.comments.find(comment =>{
            return comment.id === id;
        })
        comment.status = status;
        comment.content = content;
    }
}

//Receiving Event from Event Bus and process it
app.post("/events", (req,res) =>{
    console.log("received event query", req.body);
    const {type, data} = req.body;
    handleEvent(type,data);
    res.send({});
})

app.listen(4002, async() =>{
    console.log("Query Service Listing on 4002")
    //Get all the Events from Event Bus
    const res = await axios.get("http://localhost:4005/events").catch((err)=>{
        console.log("err",err)
    })

    for(let event of res.data){
        console.log("Processing event:", event.data);
        handleEvent(event.type, event.data);
    }
})


// POSTS DATA TYPE =>
// const posts = {
//     "sdde21d" : {
//         id : "sdde21d",
//         title : "post title",
//         comments : [
//             {
//                 id : "we3wew2",
//                 contnet : "comment !"
//             },
//             {
//                 id : "dsd7ds",
//                 contnet : "new comment !"
//             }
//         ]
//     },
//     "dsdd2s3" : {
//         id : "dsdd2s3",
//         title : "post2 title",
//         comments : [
//             {
//                 id : "hk33h",
//                 contnet : "comment !"
//             },
//             {
//                 id : "dsd7ds",
//                 contnet : "new comment !"
//             }
//         ]
//     }
// }
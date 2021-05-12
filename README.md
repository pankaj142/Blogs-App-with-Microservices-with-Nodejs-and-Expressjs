# Blogs-App-with-Microservices-with-Nodejs-and-Expressjs

## Simple Blogs app

User can create Posts and comment on Posts.
Once the user submit the comment, comment is moderated. If the comment content has "orange" in it, then the comment is rejected else its approved.

Microservice architecture is used here.
UI is build using Reactjs.
Backend Services is build using Nodejs and Expressjs.

### Microservices
1. Posts Service => Responsible to create new post. Also to handle all post update logic.
2. Comments Service => Responsible to create new comment of a post. Also to handle all comment update logic.
3. Query Service => Responsible to provide list of Posts and their comments to UI
4. Moderation Service => Responsible to moderate the comment content.
5. Event-Bus (Expressjs app) => to listen events emitted by Posts, Comments, Query and Moderation Services. These events are then broadcasted to all Services. Also, the event is stored on Data Store.

This is simple application to understand the working of Microservices.
Building the app from scratch I understand the issues, problems that come across while building an app suing microservice architrcture than monolith architechure.

### For communication among Services, I have use plain HTTP request.
The Strategies that are implemented in microserives architecture are =>
1. Async communication Approach
2. Sync communication Approach

I understood limitations of each of them, and use cases wherein they can be used.
In this app, I have used Async Communication Approach for communication amoung services.
Not used any library or package for message queues, build by plain Javascript.

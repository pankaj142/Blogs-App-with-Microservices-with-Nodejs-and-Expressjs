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

Kubernetes is used to orchastrating Collection of Mico services.

Tools required =>
1. Kubernetes, if you are using this deployment of local system, then install minikube
2. install ingress-nginx

## Deploy Microservices app using Kubernetes

#### 1. Build docker images for each micro service

cd posts \
docker build -t docker_hub_username/posts

cd comments \
docker build -t docker_hub_username/comments

cd query \
docker build -t docker_hub_username/query

cd moderation \
docker build -t docker_hub_username/moderation

cd event-bus \
docker build -t docker_hub_username/event-bus

cd client \
docker build -t docker_hub_username/client


#### 2. Push them to docker hub

docker login \
docker push docker_hub_username/posts \
docker push docker_hub_username/comments \
docker push docker_hub_username/query \
docker push docker_hub_username/moderation \
docker push docker_hub_username/event-bus \
docker push docker_hub_username/client \


#### 3. create deployment object for each micro service using yaml file

#### 4. create ClusterIP Service object for each micro service using yaml file


#### 5. create Load Balancer Service with ingress-nginx using yaml file

#### 6. write Routing rules there.

#### 7. If you are deploying on local system, then add this change on /etc/hosts file, \
minikube_id posts.com

For 3, 4, 5, 6 use command => to create the Deployment and Service Objects. \
kubectl apply -f file_name.yaml \


This method of deployment can be used on production.
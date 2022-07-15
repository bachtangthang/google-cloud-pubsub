const express = require("express");
const { PubSub } = require(`@google-cloud/pubsub`);
const app = express();
const grpc = require('grpc');
const pubsub = new PubSub({grpc, projectId: "esoteric-bruin-356302"});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
require('dotenv').config();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});

async function createTopicAndSubcription(topicNameOrId, subscriptionName) {

  try{
    await pubsub.createTopic(topicNameOrId);
    await pubsub.topic(topicNameOrId).createSubscription(subscriptionName);
    console.log(`Topic ${topicNameOrId} created.`);
  }catch(err){
    console.log(err)
  }
}

createTopicAndSubcription(process.env.topicName, process.env.subscriptionName);
module.exports = app

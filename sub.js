const {PubSub} = require('@google-cloud/pubsub');
const grpc = require('grpc');
// Creates a client; cache this for further use
const pubSubClient = new PubSub({grpc, projectId: "esoteric-bruin-356302"});
require('dotenv').config();

const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`Attributes: ${message.attributes}`);
  console.log('Received message:', JSON.parse(message.data.toString()));

  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

function listenForMessages() {
  const subscription = pubSubClient.topic(process.env.topicName).subscription(process.env.subscriptionName);

  let messageCount = 0;
  const timeout = 60;
  subscription.on('message', messageHandler);


  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

listenForMessages();
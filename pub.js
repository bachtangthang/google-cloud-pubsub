const { PubSub } = require(`@google-cloud/pubsub`);
const grpc = require('grpc');
const pubsub = new PubSub({grpc, projectId: "esoteric-bruin-356302"});

require('dotenv').config();

const data = {
  product_name: "thịt chó 1",
  image_url: "url",
  landing_page_url: "landing_page_url",
  category: "thit cho",
  price: 10000,
  status: 1,
  product_id: "1000",
  portal_id: 1,
};

const data2 = {
  product_name: "thịt chó 2",
  image_url: "url",
  landing_page_url: "landing_page_url",
  category: "thit cho",
  price: 10000,
  status: 1,
  product_id: "1000",
  portal_id: 1,
};

async function publishMessage(data) {
  const dataBuffer = Buffer.from(JSON.stringify(data));
  console.log(dataBuffer)
  try {
    const messageId = await pubsub
      .topic(process.env.topicName)
      .publishMessage({data: dataBuffer});
    console.log(`Message ${messageId} published with data ${data}`);
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
    process.exitCode = 1;
  }
}

publishMessage(data2);
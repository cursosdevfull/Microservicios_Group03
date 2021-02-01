const amqp = require("amqplib");

let channel;

const args = process.argv.slice(2);

const consumer = (message) => {
  console.log(` [x] Received ${message.content.toString()}`);
};

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  const exchangeName = "pubsub";
  await channel.assertExchange(exchangeName, "fanout", { durable: true });

  const assertQueue = await channel.assertQueue("", { exclusive: true });

  await channel.bindQueue(assertQueue.queue, exchangeName, "");

  console.log(" Waiting for message");

  channel.consume(assertQueue.queue, consumer, { noAck: true });
};

start();

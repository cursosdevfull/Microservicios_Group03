const amqp = require("amqplib");

let channel;

const args = process.argv.slice(2);

const consumer = (message) => {
  console.log("Routing Sensor: " + message.fields.routingKey);
  console.log(` [x] Received ${message.content.toString()}`);
};

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  const exchangeName = "exchange_topic";
  await channel.assertExchange(exchangeName, "topic", { durable: false });

  const assertQueue = await channel.assertQueue("", { exclusive: true });

  const keys = args.length > 0 ? args : ["general.error"];

  keys.forEach((key) => {
    channel.bindQueue(assertQueue.queue, exchangeName, key);
  });

  console.log(" Waiting for message");

  channel.consume(assertQueue.queue, consumer, { noAck: true });
};

start();

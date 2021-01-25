const amqp = require("amqplib");

const consumer = (message) => {
  console.log(` [x] Received ${message.content.toString()}`);
};

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queueName = "queue name 01";
  await channel.assertQueue(queueName, { durable: false });

  console.log(" Waiting for message");

  channel.consume(queueName, consumer, { noAck: true });
};

start();

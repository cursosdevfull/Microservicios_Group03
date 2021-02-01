const amqp = require("amqplib");

let channel;

const args = process.argv.slice(2);

const timeProcess = +args[0];

const consumer = (message) => {
  console.log(` [x] Received ${message.content.toString()}`);
  setTimeout(() => {
    channel.ack(message);
  }, timeProcess * 1000);
};

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  const queueName = "queue name 02";
  await channel.assertQueue(queueName, { durable: true });

  channel.prefetch(1);

  console.log(" Waiting for message");

  channel.consume(queueName, consumer, { noAck: false });
};

start();

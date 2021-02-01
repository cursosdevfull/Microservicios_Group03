const amqp = require("amqplib");

let channel;

const args = process.argv.slice(2);

const consumer = (message) => {
  console.log(` [x] Received ${message.content.toString()}`);
};

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  channel = await connection.createChannel();

  const exchangeName = "exchange_direct";
  await channel.assertExchange(exchangeName, "direct", { durable: false });

  const assertQueue = await channel.assertQueue("", { exclusive: true });

  const routing = args.length > 0 ? args[0] : "errors";

  await channel.bindQueue(assertQueue.queue, exchangeName, routing);

  console.log(" Waiting for message");

  channel.consume(assertQueue.queue, consumer, { noAck: true });
};

start();

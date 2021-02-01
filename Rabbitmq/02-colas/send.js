const amqp = require("amqplib");

const args = process.argv.slice(2);

const start = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const nameQueue = "queue name 02";
  await channel.assertQueue(nameQueue, { durable: true });

  const message = args.length > 0 ? args[0] : "Message 01";
  channel.sendToQueue(nameQueue, Buffer.from(message), { persistent: true });
  console.log(` [x] Sent ${message}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

start();

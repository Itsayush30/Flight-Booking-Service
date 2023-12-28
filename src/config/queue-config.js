const amqplib = require("amqplib");

let channel, connection;

async function connectQueue() {
  try {
    connection = await amqplib.connect("amqp://localhost");
    channel = await connection.createChannel();

    await channel.assertQueue("airline-notification-service");
  } catch (error) {
    console.log(error);

    throw error;
  }
}

async function sendData(data) {
  try {
    await channel.sendToQueue(
      "airline-notification-service",
      Buffer.from(JSON.stringify(data))
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  connectQueue,
  sendData,
};

/**Data was of obj form thats why JSON.stringyfy() */

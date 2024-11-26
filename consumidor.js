const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw new Error(`Connection error: ${error0.message}`);
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw new Error(`Channel creation error: ${error1.message}`);
        }

        const queue = 'hello';

        channel.assertQueue(queue, { durable: false });
        console.log(`[!] Waiting for messages in queue: ${queue}. Press CTRL+C to exit.`);

        channel.consume(queue, (msg) => {
            console.log(`[x] Received: ${msg.content.toString()}`);
        }, { noAck: true });
    });
});


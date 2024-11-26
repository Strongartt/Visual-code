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
        const message = ' Asunto: Notificación Formal de Baja Definitiva de la Carrera';

        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`[x] Message sent: ${message}`);
    });

    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500);
});



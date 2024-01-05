const amqp = require('amqplib')
require("dotenv").config();

const getData = async (client) => {
    const rabbitmqUrl = `amqp://${process.env.USER}:${process.env.PASSWORD}@${process.env.URL}/keamanan`

    try {
        // Membuat koneksi ke RabbitMQ server
        console.log('Membuat koneksi ke RabbitMQ server...');
        const connection = await amqp.connect(rabbitmqUrl)

        // Membuat channel
        console.log('Membuat channel...');
        const channel = await connection.createChannel()

        // Mengonsumsi pesan dari queue
        console.log('Mengonsumsi pesan dari queue...');
        channel.consume('report', (message) => {
            data = message.content.toString()
            client.sendMessage('120363204122320229@g.us', data);
        }, { noAck: true })

        // Menampilkan informasi bahwa aplikasi telah terhubung saat dijalankan
        console.log('Aplikasi berhasil terhubung ke RabbitMQ server.')
    } catch (error) {
        console.error('Error:', error)
    }
}


module.exports = { getData }
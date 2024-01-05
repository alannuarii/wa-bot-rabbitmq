const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { getData } = require('./mq')

const client = new Client({
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('authenticated', (session) => {
    console.log(session);
    getData(client); // Panggil getData setelah otentikasi
});

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log("ready to message");
});

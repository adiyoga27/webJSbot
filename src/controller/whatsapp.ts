import webjs from "whatsapp-web.js"
const {
    LocalAuth,
    Client
} = webjs
import {
    connection
} from "../services/database"



connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});

const map = new Map();

connection.query('SELECT * FROM client', function (error, results, fields) {
    if (error) throw error;

    results.map((item:any) => {
        console.log('The solution is: ', item.clientID);
    })


});




export const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "codingaja",
        dataPath: "./auth"
    }),
    puppeteer: {
        headless: false
    }
});

// client.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

// client.on('ready', async () => {
//     console.log('Client is ready!');
//     let number = 6282145566492;
//     let message = "yuhuu";
//     number = `6282145566492@c.us`;
//    var result = await client.sendMessage(number, message);
//    console.log(result);
// });
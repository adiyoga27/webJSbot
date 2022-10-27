import {LocalAuth, Client} from "whatsapp-web.js"
import {
    connection
} from "../services/database"


const clients = new Map<string, Client>();




connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


connection.query('SELECT * FROM client', function (error, results, fields) {
    if (error) throw error;

    results.map((item:any) => {
        console.log('The solution is: ', item.clientID);
        clients.set(item.clientID, 
         new Client({
                authStrategy: new LocalAuth({
                    clientId: item.clientID,
                    dataPath: "./auth"
                }),
                puppeteer: {
                    headless: false
                }
            }),
            
        )

    })


});


export {clients}



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
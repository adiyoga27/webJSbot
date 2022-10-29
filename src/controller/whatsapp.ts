import {LocalAuth, Client} from "whatsapp-web.js"
import {
    connection, getClientData
} from "../services/database"
const clients = new Map<string, Client>();

getClientData().then((data:any)=>{
        data.forEach((result:any) => {
        console.log('The solution is: ', result.clientID);
        
        clients.set(result.clientID, new Client({
            authStrategy: new LocalAuth({
                clientId: result.clientID,
                dataPath: "./auth"
            }),
            puppeteer: {
                headless: true
            }
        }))

        
clients.forEach(client => {
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
    });

    client.on('ready', async () => {
        console.log('Client is ready!');    
    });
    client.initialize();
  })
    });
    return clients;
})



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
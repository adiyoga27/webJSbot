import { LocalAuth, Client, Message } from "whatsapp-web.js"
import {
    connection, getClientData
} from "../services/database"
const clients = new Map<string, Client>();
getClientData().then((data: any) => {
    data.forEach((result: any) => {
        console.log('The solution is: ', result.clientID);
        clients.set(result.clientID, new Client({
            authStrategy: new LocalAuth({
                clientId: result.clientID,
                dataPath: "./auth"
            }),
            puppeteer: {
                headless: false
            }
        }))
        clients.forEach(client => {
            client.on('ready', async () => {
                console.log('Client is ready!');
            });
            client.on('qr', (qr) => {
                console.log('QR RECEIVED', qr);
            });
            client.initialize();
        })
    });
    return clients;
})


 const sendMessage = function(req:any, res:any){
     const client_id = req.headers.client_id
     const api_key = req.headers.api_key
     console.log("SELECT * FROM clients WHERE is_active = 1 and clientID = "+client_id+" and api_key = "+api_key+" ORDER BY id DESC LIMIT 1");
        connection.query(
            "SELECT * FROM clients WHERE is_active = 1 and clientID = "+client_id+" and api_key = "+api_key+" ORDER BY id DESC LIMIT 1", 
            function(err:any, rows:any, fields:any){     
                console.log(rows)                                           
                if(rows != undefined){

                    clients.get(rows[0].clientID)?.sendMessage('6285792486889@c.us', 'tester adiyoga').then(function( message){
                            return message
                        })
                }    
                return false

            }
    )}
export { clients, sendMessage }

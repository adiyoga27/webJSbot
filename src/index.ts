import {clients} from "./controller/whatsapp";

clients.get('2709')?.on('ready', ()=>{
    console.log('Client is ready! 2709');    


})
clients.get('2727')?.on('ready', ()=>{
    console.log('Client is ready! 2727');    
})
// clients.get(clientId).send
// clients.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

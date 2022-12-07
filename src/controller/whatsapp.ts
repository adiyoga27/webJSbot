import { LocalAuth, Client, Message, MessageMedia } from "whatsapp-web.js"
import {io} from "../index"
import {
    allowedClientIDSending,
    connection, getClientData
} from "../services/database"
import express from 'express'
import { sendMediaSchema, sendMessageSchema } from "../validations/whatsapp-schema"
import { phoneNumberFormatter } from "../helpers/formatter"
import { successResponseData, errorResponse, errorValidationResponse } from "../helpers/response"
import { validationResult, body } from "express-validator"
export const router = express.Router()
const qrcode = require('qrcode-terminal');
//Initialize Whatsapp JS
export const clients = new Map<string, Client>();
getClientData().then((data: any) => {
    data.forEach((result: any) => {
        console.log('The solution is: ', result.clientID);
        // const clients = new Client({
        //     authStrategy: new LocalAuth({
        //         clientId: 'client-one'
        //     })
        // })

        // clients.on('qr', qr => {
        //     qrcode.generate(qr, {small: true});
        // });
        
        // clients.on('ready', () => {
        //     console.log('Client is ready!');
        // });
        
        // clients.initialize();
        const clt = new Client({
            authStrategy: new LocalAuth({
                clientId: result.clientID,
                dataPath: "./auth"
            }),
            puppeteer: {
                executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            }
        });
        clt.on('ready', async () => {
            console.log(clt.info+'Client is ready!');
        });
        // clt.on('qr', (qr) => {
            
        //     qrcode.generate(qr, {small: true});
        //     console.log('QR RECEIVED', qr);
        // });
        clt.initialize();
        clients.set(result.clientID, clt)
    });
    return clients;
})




//END Initialize

//Route API Express Whatsapp

router.get('/', function (req, res) {
    res.send('hello');
})

router.post('/send-message', sendMessageSchema,  async function (req:any, res:any) {
    const client_id = req.headers.client_id
    const api_key = req.headers.api_key
    const phone = phoneNumberFormatter(req.body.phone)
    const message = req.body.message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorValidationResponse(res, errors)
    }
    if(await allowedClientIDSending(client_id, api_key)){
        
      const isWhatsapp = await clients.get(client_id)?.isRegisteredUser(phone);
      if(!isWhatsapp){
        //Check Registered Whatsapp
        return errorResponse(res, "Whatsapp Not Registered")
      }

      //Send Message
      const response = await clients.get(client_id)?.sendMessage(phone,message)
      if(response){
        return successResponseData(res, response)
      }
      return errorResponse(res, "Error Sending Message")
    }
    return errorResponse(res, "Client ID or Api Key Not Valid")
});

router.post('/send-media', sendMediaSchema,  async function (req:any, res:any) {
    const client_id = req.headers.client_id
    const api_key = req.headers.api_key
    const phone = phoneNumberFormatter(req.body.phone)
    const message = req.body.message
    const url = req.body.url
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorValidationResponse(res, errors)
    }
    if(await allowedClientIDSending(client_id, api_key)){

        const isWhatsapp = await clients.get(client_id)?.isRegisteredUser(phone);
        if(!isWhatsapp){
          //Check Registered Whatsapp
          return errorResponse(res, "Whatsapp Not Registered")
        }

        const filetype = req.body.filetype
        if(filetype == 'image'){
            const media = await MessageMedia.fromUrl(url);
            const response = await clients.get(client_id)?.sendMessage(phone, media, {caption:message})
            if(response){
                return successResponseData(res, response)
            }
        }else if(filetype == 'video'){
            const media = await MessageMedia.fromUrl(url);
            const response = await clients.get(client_id)?.sendMessage(phone, media, {caption:message})
            if(response){
                return successResponseData(res, response)
            }
        }else if(filetype == 'file'){
            const media = await MessageMedia.fromUrl(url);
            const response = await clients.get(client_id)?.sendMessage(phone, media, {caption:message})
            if(response){
                return successResponseData(res, response)
            }
        }
      return errorResponse(res, "Error Sending Message")
    }
    return errorResponse(res, "Client ID or Api Key Not Valid")
});



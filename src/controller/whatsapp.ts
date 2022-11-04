import { LocalAuth, Client, Message, MessageMedia } from "whatsapp-web.js"
import {
    allowedClientIDSending,
    connection, getClientData
} from "../services/database"
import express from 'express'
import { sendMediaSchema, sendMessageSchema } from "../validations/whatsapp-schema"
import { phoneNumberFormatter } from "../helpers/formatter"
import { successResponseData, errorResponse, errorValidationResponse } from "../helpers/response"
import { validationResult, body } from "express-validator"
const router = express.Router()

//Initialize Whatsapp JS
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
                headless: true,
                executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
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

//END Initialize

//Route API Express Whatsapp

router.get('/', function (req, res) {
    res.send('hello');
})

router.post('/send-message', sendMessageSchema,  async function (req:any, res:any) {
    const client_id = req.headers.client_id
    const api_key = req.headers.api_key

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorValidationResponse(res, errors)
    }
    if(await allowedClientIDSending(client_id, api_key)){
      const response = await clients.get(client_id)?.sendMessage(phoneNumberFormatter(req.body.phone), req.body.message)
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errorValidationResponse(res, errors)
    }
    if(await allowedClientIDSending(client_id, api_key)){
        const filetype = req.body.filetype
        if(filetype == 'image'){
            const media = await MessageMedia.fromUrl(req.body.url);
            const response = await clients.get(client_id)?.sendMessage(phoneNumberFormatter(req.body.phone), media, {caption:req.body.message})
            if(response){
                return successResponseData(res, response)
            }
        }else if(filetype == 'video'){
            const media = await MessageMedia.fromUrl(req.body.url);
            const response = await clients.get(client_id)?.sendMessage(phoneNumberFormatter(req.body.phone), media, {caption:req.body.message})
            if(response){
                return successResponseData(res, response)
            }
        }else if(filetype == 'file'){
            const media = await MessageMedia.fromUrl(req.body.url);
            const response = await clients.get(client_id)?.sendMessage(phoneNumberFormatter(req.body.phone), media, {caption:req.body.message})
            if(response){
                return successResponseData(res, response)
            }
        }
      return errorResponse(res, "Error Sending Message")
    }
    return errorResponse(res, "Client ID or Api Key Not Valid")
});


export default router

import whatsapp from "./controller/whatsapp"
import * as dotenv from 'dotenv'
import bodyParser from "body-parser";
import express from 'express'
dotenv.config()
const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);
app.use('/', whatsapp)
app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
  })

// clients.get(clientId).send
// clients.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

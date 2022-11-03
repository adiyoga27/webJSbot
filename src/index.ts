import api from "./routers/api"
import express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use('/', api)
app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.APP_PORT}`)
  })

// clients.get(clientId).send
// clients.on('qr', (qr) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });

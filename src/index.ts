import {router, clients} from "./controller/whatsapp"
import * as dotenv from 'dotenv'
import bodyParser from "body-parser";
import express from 'express'
import { Server } from "socket.io";
import http from "http"
import fs from "fs"
import e from "express";
import { getString } from "./helpers/utils";
const QRcode = require('qrcode');
dotenv.config()
const app = express()
const server = http.createServer(app)

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  bodyParser.json()
);
app.use('/', router)

export const io = new Server(server, {
  cors:{
    origin: '*',
    methods:["*"]
  }
});


io.on('connection', (socket)  => {
  
  const clientID = getString(socket.handshake.headers.client_id)

  socket.on('check', ()=>{
    console.log("Check Emit")
    const info = clients.get(clientID)?.info;
    io.emit('user',  {
      'id' : info?.platform,
      'name': info?.pushname
  })
  })

  clients.get(clientID)?.on('qr', (qr) => {
    console.log(qr)
    QRcode.toDataURL(qr,(error:any, url:any) => {
        if (error) {
          console.log(error)
            // socket.emit(Uatiz.socket.Status_Uaitz, Uatiz.socket.error);
        }
      console.log(url)
      io.emit('qr', url);
        // socket.emit(Uatiz.socket.Status_Uaitz, Uatiz.socket.qr);
    })
  })
clients.get(clientID)?.on('ready', (response: any)=>{
  console.log(response);
  console.log("Client Ready");
  const info = clients.get(clientID)?.info;
  
  io.emit('user',  {
      'id' : info?.platform,
      'name': info?.pushname
  })

})
  socket.on('logout',()=>{
    if (fs.existsSync("./auth/session-1234")) {
      clients.get(clientID)?.destroy();

      fs.rmSync("./auth/session-1234", { recursive: true, force: true });
      clients.get(clientID)?.initialize();
    }
  })
});

server.listen(process.env.APP_PORT, () => {
  console.log('listening on *:', process.env.APP_PORT);
});


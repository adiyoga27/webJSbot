import express from 'express'
import {clients, sendMessage} from "../controller/whatsapp";
import {getClientActive} from "../services/database"

const router = express.Router()

router.get('/', function(req, res){
    res.send('hello');
})

router.post('/send-message', function(req, res){
    sendMessage(req, res);
   
});

export default router
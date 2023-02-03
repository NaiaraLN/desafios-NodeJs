import{ Router } from 'express';
import {MessageEntity} from '../utils/messagesEntity.js';
import {USERNAME, PASSWORD} from '../config/config.js'
import logger from '../scripts/logger.js'


const apiMessages = new MessageEntity(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1ezwxyq.mongodb.net/ecommerce?retryWrites=true&w=majority`)
const routerMessages = Router()
apiMessages.getConnection()
routerMessages.post('/', async (req,res) =>{
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let generateId = 1
        let author = {
            _id:req.body.email,
            nombre:req.body.name,
            apellido:req.body.lastname,
            edad:req.body.age,
            alias:req.body.alias,
            avatar:req.body.avatar
        }
        let message={
            _id: generateId++,
            author: author ,
            text:req.body.text
        }
        await apiMessages.save('messages', message)
        res.redirect('/')
        
    } catch (error) {
        logger.error(`se produjo un error al guardar los mensajes ${error}`);
    }
    
})

routerMessages.get('/', async (req,res) =>{
    try {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} implementada`)
        let allMessages = await apiMessages.getAll('messages')
        let json = JSON.stringify(allMessages)
        let msgs = JSON.parse(json)
        let obj = {
            id: 'mensajes',
            messages: [...msgs]
        }
        let norMessages = apiMessages.normalize(obj) 
        res.json(norMessages)
    } catch (error) {
        logger.error(`se produjo un error al obtener los mensajes ${error}`);
    }
    
})

export default routerMessages
import{ Router } from 'express';
import {MessageEntity} from '../utils/messagesEntity.js';

const apiMessages = new MessageEntity('mongodb://root:987654@localhost:2017/ecommerce?authSource=admin')
const routerMessages = Router()
apiMessages.getConnection()
routerMessages.post('/', async (req,res) =>{
    try {
        console.log('peticion recibida')
        let author = {
            id:req.body.email,
            nombre:req.body.name,
            apellido:req.body.lastname,
            edad:req.body.age,
            alias:req.body.alias,
            avatar:req.body.avatar
        }
        let message={
            author: author ,
            text:req.body.text
        }
        console.log(message)
        await apiMessages.save('messages', message)
        console.log('mensaje guardado')
        let allMessages = await apiMessages.getAll('messages')
        console.log(allMessages)
        res.redirect('/')
        
    } catch (error) {
        console.log(`se produjo un error al guardar los mensajes ${error}`);
    }
    
})

routerMessages.get('/', async (req,res) =>{
    try {
        let allMessages = await apiMessages.getAll('messages')
        let json = JSON.stringify(allMessages)
        let msgs = JSON.parse(json)
        let obj = {
            id: 'mensajes',
            messages: [...msgs]
        }
        
        let norMessages = await apiMessages.normalize(obj) 
        res.json(norMessages)
    } catch (error) {
        console.log(`se produjo un error al obtener los mensajes ${error}`);
    }
    
})

export default routerMessages
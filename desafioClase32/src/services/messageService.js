import {USERNAME, PASSWORD} from '../config/config.js'
import logger from '../scripts/logger.js'
import {MessageEntity} from '../utils/messagesEntity.js';

const apiMessages = new MessageEntity(`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.1ezwxyq.mongodb.net/ecommerce?retryWrites=true&w=majority`)
apiMessages.getConnection()

export class MessageService{
    static async saveMsg(user, text){
        try {
            let generateId = 1
            let author = {
                _id:user.email,
                nombre:user.name,
                apellido:user.lastname,
                edad:user.age,
                alias:user.alias,
                avatar:user.avatar
            }
            let message={
                _id: generateId++,
                author: author ,
                text:text
            }
            return await apiMessages.save('messages', message)
        } catch (error) {
            logger.error(`se produjo un error al guardar los mensajes ${error}`);
        }
        
    }
    static async getMsg(){
        try {
            let allMessages = await apiMessages.getAll('messages')
            let json = JSON.stringify(allMessages)
            let msgs = JSON.parse(json)
            let obj = {
                id: 'mensajes',
                messages: [...msgs]
            }
            let norMessages = apiMessages.normalize(obj) 
            return norMessages
        } catch (error) {
            logger.error(`se produjo un error al obtener los mensajes ${error}`);
        }
        
    }
}
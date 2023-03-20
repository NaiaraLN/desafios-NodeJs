import logger from '../scripts/logger.js'
import { MongoDAO } from '../model/mongoDao/mongoDAO.js'

export default class MessageService{
    async saveMsg(user, text){
        try {
            let allMessages = await MongoDAO.getAll('messages')
            let lastId = allMessages.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
            let author = {
                id:user.email,
                nombre:user.name,
                apellido:user.lastname,
                edad:user.age,
                alias:user.alias,
                avatar:user.avatar
            }
            let message={
                author: author ,
                text:text
            }
            return await MongoDAO.save('messages', message)
        } catch (error) {
            logger.error(`se produjo un error al guardar los mensajes ${error}`);
        }
        
    }
    async getMsg(){
        try {
            let allMessages = await MongoDAO.getAll('messages')
            console.log(allMessages)
            let json = JSON.stringify(allMessages)
            let msgs = JSON.parse(json)
            /* let obj = {
                id: 'mensajes',
                messages: [...msgs]
            } */
            return msgs
        } catch (error) {
            logger.error(`se produjo un error al obtener los mensajes ${error}`);
        }
        
    }
}
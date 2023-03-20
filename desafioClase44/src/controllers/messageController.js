import MessageService from "../services/messageService.js";
import { buildSchema } from 'graphql'
import MessageDTO from "../dto/messageDTO.js";

class MessageController extends MessageService{
    schema(){
        return buildSchema(`
        type Author{
            id: String,
            nombre:String,
            apellido:String,
            edad:Int,
            alias:String,
            avatar:String
        }
        type Message {
            author: [Author],
            text: String
        }
        type Query{
            messages: [Message]
        }
        type Mutation{
            postMessage(email:String, name:String, lastname:String, age:Int, alias:String, avatar:String, text:String): Message
        }
        `)
    }
    root(){
        const root={
            messages: async () => await this.get(),
            postMessage: async(data) => await this.postMsg(data)
        }
        return root
    }
    async postMsg(data){
        const {email, name, lastname, age, alias, avatar, text} = data
        return await this.saveMsg({user: email, name, lastname, age, alias, avatar}, text)
        
    }

    async get(){
        const messages = await this.getMsg()
        return messages
        /* const norMessages = new MessageDTO(messages)
        return norMessages */
    }
}

export default new MessageController()
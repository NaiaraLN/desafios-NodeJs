import { MessageService } from "../services/messageService.js";
import { buildSchema } from 'graphql'
import MessageDTO from "../dto/messageDTO.js";

export class MessageController extends MessageService{
    schema(){
        return buildSchema(`
        type Message {
            author: Array,
            text: String
        }
        type Query{
            messages: [Message]
        }
        type Mutation{
            postMessage(email:String, name:String, lastname:String, age:Number, alias:String, avatar:String, text:String): Message
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
        const norMessages = new MessageDTO(messages)
        return norMessages
    }
}
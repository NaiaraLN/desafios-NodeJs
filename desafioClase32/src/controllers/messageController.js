import { MessageService } from "../services/messageService.js";
import MessageDTO from "../dto/messageDTO.js";

export class MessageController extends MessageService{
    static async postMsg(req,res){
        const {email, name, lastname, age, alias, avatar, text} = req.body;
        await this.saveMsg({user: email, name, lastname, age, alias, avatar}, text)
        res.redirect('/')
    }

    static async get(_,res){
        const messages = await this.getMsg()
        const norMessages = new MessageDTO(messages)
        res.json(norMessages)
    }
}
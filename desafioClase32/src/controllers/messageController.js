import { MessageService } from "../services/messageService.js";

export class MessageController extends MessageService{
    static async postMsg(req,res){
        const {email, name, lastname, age, alias, avatar, text} = req.body;
        await this.saveMsg({user: email, name, lastname, age, alias, avatar}, text)
        res.redirect('/')
    }

    static async get(_,res){
        const norMessages = await this.getMsg()
        res.json(norMessages)
    }
}
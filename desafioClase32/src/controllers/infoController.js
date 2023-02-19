import { InfoService } from '../services/infoService.js';

export class InfoController extends InfoService{
    static get(_,res){
        const {args, info} = this.getInfo()
        res.render('info', {args, info})
    }
}
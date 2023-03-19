import { InfoService } from '../services/infoService.js';
import { buildSchema } from 'graphql'

export class InfoController extends InfoService{
    schema(){
        return buildSchema(`
        type Info{
            args: Array,
            info: Object
        }
        type Query{
            infos: [Info]
        }
        `)
    }
    root(){
        const root = {
            infos: () => this.getInfo()
        }
    }
}
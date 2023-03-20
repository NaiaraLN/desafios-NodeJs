import { InfoService } from '../services/infoService.js';
import { buildSchema } from 'graphql'

class InfoController extends InfoService{
    schema(){
        return buildSchema(`
        type Info{
            platform: String,
            version: String,
            memory: Int,
            path: String,
            id: Int,
            dirname: String,
            cpus: Int
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
        return root
    }
}

export default new InfoController()
import { normalize, schema } from "normalizr";
import util from 'util'
import ContainerMongoDB from "../containers/containerMongoDB.js";


const authorSchema = new schema.Entity('authors',{},{idAttribute:'_id'});

// Definimos un esquema de organigrama
const message = new schema.Entity('messages', {author:  [authorSchema]}, {idAttribute:'_id'});

const posts = new schema.Entity('posts',{messages: [message]});

class MessageEntity extends ContainerMongoDB{
    constructor(connection){
        super(connection)
    }
    print(objeto) {
        console.log(util.inspect(objeto, false, 12, true))
    }
    
    normalize(object){
        let testNormalizado = normalize(object,posts)
        this.print(testNormalizado)
        console.log('Longitud objeto normalizado: ', JSON.stringify(testNormalizado).length)
        return testNormalizado
    }
}

export { MessageEntity}
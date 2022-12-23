import { normalize, schema, denormalize } from "normalizr";
import util from 'util'
import ContainerMongoDB from "../containers/containerMongoDB.js";


const authorSchema = new schema.Entity('authors',{},{idAttribute:'id'});

// Definimos un esquema de organigrama
const message = new schema.Entity('messages', {author: [authorSchema]}, {idAttribute:'_id'});

const posts = new schema.Entity('posts',{messages:[message]})

class MessageEntity extends ContainerMongoDB{
    constructor(connection){
        super(connection)
    }
    print(objeto) {
        console.log(util.inspect(objeto, false, 12, true))
    }
    
    normalize(object){
        console.log(object)
        let testNormalizado = normalize(object,[posts])
        console.log(testNormalizado)
        this.print(testNormalizado)
        let deNormalize = denormalize(testNormalizado.result,posts,testNormalizado.entities);
        console.log(deNormalize)
        console.log('Longitud objeto original: ', JSON.stringify(object).length)
        console.log('Longitud objeto normalizado: ', JSON.stringify(normalizedMessages).length)
        /* this.print(normalizedMessages)
        return normalizedMessages  */
    }
}

export { MessageEntity}
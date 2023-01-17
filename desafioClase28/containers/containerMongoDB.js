import mongoose from 'mongoose';
import messageModel from '../model/messageModel.js'

mongoose.set("strictQuery", false);

class ContainerMongoDB {
    constructor(connection){
        this.connection = connection
    }
    async startConnection() {
        await mongoose.connect(this.connection,{
        serverSelectionTimeoutMS: 5000,
        })
        console.log('mongo connected')
        return {status:'éxito', description:'base de datos conectada'}
    }
    async getAll(collection) {
        try {
            if (collection == 'messages') {
                let allMessages = await messageModel.find({})
                return allMessages
            } 
        } catch (error) {
            console.log(`No se obtuvieron los mensajes ${error}`);
        }
    }
    async save(collection,message){
        try {
            if (collection == 'messages') {
                let newMessage = new messageModel(message)
                let saveMessage = await newMessage.save()
                console.log(saveMessage)
                return newMessage
            }
        } catch (error) {
            console.log(`Error al guardar el mensaje ${error}`);
        }
        
    }
    

    async getConnection () {
        await this.startConnection()
    }
}
export default ContainerMongoDB;


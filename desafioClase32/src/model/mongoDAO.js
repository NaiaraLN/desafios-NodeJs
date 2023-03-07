import { MONGO_URI } from '../config/config.js';
import mongoose from 'mongoose';
import Messages from './messageDAO.js'
import User from './usersDAO.js';
import logger from '../scripts/logger.js'

mongoose.set("strictQuery", false);

class MongoDBDao {
    constructor(connection){
        this.mongoose =  mongoose.connect(connection,{
            serverSelectionTimeoutMS: 5000,
            })
            .catch(err => {
                console.log(err)
                process.exit()
            })

        this.models = {
            [User.model]: mongoose.model(User.model, User.schema),
            [Messages.model]: mongoose.model(Messages.model, Messages.schema)
        }
    }
    async getAll(collection) {
        try {
            if (collection) {
                let array = await this.models[collection].find({})
                return array
            }
        } catch (error) {
            logger.error(`No se obtuvieron los mensajes ${error}`);
        }
    }
    async getUser(username, collection){
        try {
            if (collection) {
                const user = await this.models[collection].findOne({username})
                return user
            }
        } catch (error) {
            logger.error(`Error al obtener usuario ${error}`);
        }
    }
    async save(collection,object){
        try {
            if (collection) {
                let newObj = new this.models[collection](object)
                console.log(newObj)
                let save = await newObj.save()
                console.log(save)
                return save
            }
        } catch (error) {
            logger.error(`Error al guardar en mongo ${error}`);
        }
        
    }
    
}


export const MongoDAO = new MongoDBDao(MONGO_URI);


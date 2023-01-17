import mongoose from 'mongoose';
import authorSchema from "./authorModel.js";

const messagesSchema = new mongoose.Schema({
    _id:{type:Number, required:true},
    author:[authorSchema],
    text:{type:String, required:true}
})

const messageModel = mongoose.model('messages', messagesSchema)
export default messageModel
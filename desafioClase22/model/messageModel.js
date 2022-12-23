import mongoose from 'mongoose';
import authorSchema from "./authorModel.js";

const messagesSchema = new mongoose.Schema({
    author:[authorSchema],
    text:{type:String, required:true}
})

const messageModel = mongoose.model('messages', messagesSchema)
export default messageModel
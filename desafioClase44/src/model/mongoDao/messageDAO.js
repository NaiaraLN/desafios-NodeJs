import mongoose from 'mongoose';

export default class Messages{
    static get authorSchema(){
        return new mongoose.Schema({
            id:{type: String, required:true},
            nombre:{type:String, required:true},
            apellido:{type:String, required:true},
            edad:{type:Number,required:true},
            alias:{type:String, required:true},
            avatar:{type:String, required:true}
        })
    }
    static get schema(){
        return new mongoose.Schema({
            author:[this.authorSchema],
            text:{type:String, required:true}
        })
    }
    static get model(){
        return 'messages'
    }
}
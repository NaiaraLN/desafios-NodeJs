import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    id:{type: String, required:true},
    nombre:{type:String, required:true},
    apellido:{type:String, required:true},
    edad:{type:Number,required:true},
    alias:{type:String, required:true},
    avatar:{type:String, required:true}
})

export default authorSchema
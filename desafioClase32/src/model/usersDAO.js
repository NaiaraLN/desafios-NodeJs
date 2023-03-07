import mongoose from "mongoose";

export default class User{
    static get model(){
        return 'users'
    }
    static get schema(){
        return new mongoose.Schema({
            username:{type:String, required: true},
            mail:{type:String, required:true},
            password:{type:String, required:true}
        })
    }
}

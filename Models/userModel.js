import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type:String,require:true},
    email: {type:String,require:true},
    password:{type:String,require:true},
    confirm_password:{type:String,require:true},
    role:{type:String,default:'user',enum:['user','admin']}
})


const user = mongoose.model('user',userSchema);
export default user;
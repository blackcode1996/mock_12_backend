const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    loggedInAt: {
        type: Date,
        default: Date.now,
    }
})

const UserModel=mongoose.model("user",UserSchema)

module.exports={
    UserModel
}
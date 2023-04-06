const express=require("express")

const {UserModel}=require("../Models/user.model")

const jwt=require("jsonwebtoken")

const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password}=req.body

    const existUser=await UserModel.findOne({email:email})

    try {
        if(existUser){
            res.status(403).send({"msg":"User already exist"})
        }else{
            bcrypt.hash(password,5,async(err,hash)=>{
                if(hash){
                    const user=new UserModel({email,password:hash})
                    await user.save()
                    res.status(200).send({"msg":"Registration successful"})
                }
            })
        }
    } catch (error) {
        res.send(400).status(error.message)
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    let token=jwt.sign({userID:user[0]._id},process.env.secret_key)
                    res.status(200).send({"msg":"Logged in","token":token})
                }else{
                    res.status(400).send({"msg":"Wrong credentials"})
                }
            })
        }
    } catch (error) {
        res.send(400).status({"msg":error.message})
    }
})


module.exports={
    userRouter
}
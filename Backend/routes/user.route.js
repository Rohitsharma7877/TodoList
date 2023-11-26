

const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../models/user.module")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

userRouter.post("/register",async (req,res)=>{
    const {name,email,pass,age}=req.body
    try{
    bcrypt.hash(pass, 5, async (err, hash)=>{
    const user=new UserModel({name,email,pass:hash,age})
    await user.save()
    res.send("Registered")
    });
    }catch(err){
    res.send("Error in registering the user")
    console.log(err)
    }
 })
    

userRouter.post("/login",async (req,res)=>{
    const {email,pass}=req.body
    console.log(email,pass)
   // Notes 2
    try{
        const user=await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(pass, user[0].pass, (err, result)=>{
            if(result){
                const token=jwt.sign({userID:user[0]._id},'masai')
                res.send({"msg":"loggin succesfull", "token":token})
            }
            else{
                res.send("wrong passord")
            }
            })
            }else{
                res.send("wrong passord")
            }
        }catch(err){
            res.send("something went wrong")
            console.log(err)
        }
    })
   
module.exports={userRouter}
    

const express= require("express")
const{NoteModel}=require("../models/Note.models")
const noteRouter= express.Router()



noteRouter.get("/",async(req,res)=>{
    const userID=req.body.userID
    try{
        const notes=await NoteModel.find({userID:userID})
        res.send(notes)
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
    
})


noteRouter.post("/create",async (req,res)=>{
    const payload=req.body
    try{
        const new_note=new NoteModel(payload)
        await new_note.save()
        res.send("created the notes")
    }catch(err){
          console.log(err)
          res.send({"msg":"something went wrong"}) 
    }
    
})


noteRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    const note= await NoteModel.findOne({"_id":id})
    const userID_in_note= note.userID
     const userID_making_req= req.body.userID
    try{
       if(userID_making_req !== userID_in_note){
        res.send({"msg":"you are not authorized"})
       }
       else{
        await NoteModel.findByIdAndUpdate({"_id":id},payload)
        res.send("update the notes")
       }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wr"})
    }
    
})



noteRouter.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id
    const note= await NoteModel.findOne({"_id":id})
    const userID_in_note= note.userID
     const userID_making_req= req.body.userID

    try{
       if(userID_making_req !== userID_in_note){
        res.send({"msg":"you are not authorized"})
       }
       else{
        await NoteModel.findByIdAndDelete({"_id":id})
        res.send("Deleted the notes")
       }
        
    }catch(err){
        console.log(err)
        res.send({"msg":"something went wrong"})
    }
   
})





module.exports={noteRouter}




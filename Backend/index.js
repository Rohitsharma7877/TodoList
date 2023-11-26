const express=require("express")
const {connection}=require("./config/db")
const {UserRouter, userRouter}=require("./routes/user.route")
const {noteRouter}=require("./routes/Note.route")
const{authenticate}=require("./middlewares/authenticate.middleware")


const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})

const cors= require("cors")
require("dotenv").config()
app.use(cors({
    origin:"*"
}))


app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)

app.listen(process.env.port ,async ()=>{
    try{
        await connection
        console.log("Mongodb connected")
    }catch(err){
        console.log("trouble to connection db")
     console.log(err)
    }
    console.log("Running at 8000 Port")
})

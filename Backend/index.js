const express=require("express")

const {connection}=require("./config/db")
const app=express()
const cors=require('cors')
require("dotenv").config()
const {AdminuserRoute}=require("./router/AdminuserRoute")

const {Authentication}=require("./middleware/Authenticate")

const {AdminProductsRoute}=require("./router/AdminproductRoute")
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{

   res.send("this is my socail api")
})

app.use("/admin",AdminuserRoute)

app.use(Authentication)

app.use("/products",AdminProductsRoute)
app.listen(process.env.port,async ()=>{


    try{

        await connection

        console.log("connected to Db")
    }catch(err){

        console.log(err,"unable to connect")
    }
    console.log("server is running")
})


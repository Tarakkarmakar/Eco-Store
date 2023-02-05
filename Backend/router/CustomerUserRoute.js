const express=require("express")
const jwt=require('jsonwebtoken')

const bcrypt=require("bcrypt")
const { CustomerUserModel}=require("../models/CustomerUserModel")


const CustomerUserRoute=express.Router()


CustomerUserRoute.post("/register",async(req,res)=>{

    const {name,email,gender,password}=req.body

    try{

        bcrypt.hash(password,8,async(err,hash)=>{
   
            const user=new  CustomerUserModel({name,email,gender,password:hash})

            await user.save()

            res.send("successfully Registered")
        })
    }catch(err){
 
        console.log(err)

        res.send("Invalid")
    }
})
CustomerUserRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body

    try{

        const user=await  CustomerUserModel.find({email})

        if(user.length>0){
            bcrypt.compare(password,user[0].password,function(err,result){

                if(result){

                    const token=email


                    res.send({"msg":"login successfull","email":token})
                }else{

                    res.send("wrong crediential")
                }
            })


        }
    }catch(err){

        console.log(err)
        res.send("Something is wrong try again")
    }
})

module.exports={

    CustomerUserRoute
}
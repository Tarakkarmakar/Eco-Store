const express=require("express")

const {productModel}=require("../models/ProductsModel")


const UserProductRoute=express.Router()

UserProductRoute.get("/",async(req,res)=>{

   
    const products=await productModel.find()
    
    res.send(products)


})

UserProductRoute.get("/kitchen",async(req,res)=>{

   
    const products=await productModel.find({"category":"kitchen"})
    
    res.send(products)


})
UserProductRoute.get("/fashion",async(req,res)=>{

   
    const products=await productModel.find({"category":"fashion"})
    
    res.send(products)


})

UserProductRoute.get("/plants",async(req,res)=>{

   
    const products=await productModel.find({"category":"plants"})
    
    res.send(products)


})

module.exports={

    UserProductRoute
}
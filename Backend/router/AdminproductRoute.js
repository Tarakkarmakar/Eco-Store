const express=require("express")

const {productModel}=require("../models/ProductsModel")


const AdminProductsRoute=express.Router()

AdminProductsRoute.get("/",async(req,res)=>{

    const userID_req=req.body.userID
   
const products=await productModel.find({"userID":userID_req})

res.send(products)

})
AdminProductsRoute.get("/All",async(req,res)=>{

   
const products=await productModel.find()

res.send(products)

})

AdminProductsRoute.post("/create",async(req,res)=>{


    const payload =req.body

    try{
        const new_product=new productModel(payload)

        await new_product.save()

        res.send({"msg":"products has been save"})
    }catch(err){

        res.send({"msg":"invalid"})
    }
})
AdminProductsRoute.patch("/update/:id",async(req,res)=>{

    const payload=req.body


        const id=req.params.id

        const product=await productModel.findOne({"_id":id})

        const userID_who_req=req.body.userID
        const userID_post=product.userID
        try{

            if(userID_who_req!==userID_post){
            
                res.send({"msg":"Not authorized"})
            }else{

                await productModel.findByIdAndUpdate({"_id":id},payload)

                res.send({"msg":"products is updated"})
            }
        
        }catch(err){

            console.log(err)

            res.send("please check you are authorized or not to update")
        }
   
})


AdminProductsRoute.delete("/delete/:id",async(req,res)=>{

    const payload=req.body


        const id=req.params.id

        const product=await productModel.findOne({"_id":id})

        const userID_who_req=req.body.userID
        const userID_post=product.userID
        try{

            if(userID_who_req!==userID_post){
            
                res.send({"msg":"Not authorized"})
            }else{

                await productModel.findByIdAndDelete({"_id":id},payload)

                res.send({"msg":"products is deleted"})
            }
        
        }catch(err){

            console.log(err)

            res.send("somewthing went wrong check You are authoreized or not")
        }
   
})
module.exports={

    AdminProductsRoute
}


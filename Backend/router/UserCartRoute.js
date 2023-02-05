const express=require("express")

const {CartModel}=require("../models/CartModel")


const CartRoute=express.Router()

CartRoute.get("/",async(req,res)=>{

    const email=req.headers.authorization.split(" ")[0]
   
const products=await CartModel.find({"email":email})

res.send(products)

})
CartRoute.get("/All",async(req,res)=>{

   
const products=await CartModel.find()

res.send(products)

})

CartRoute.post("/create",async(req,res)=>{


    const payload =req.body

    try{
      
            const new_product=new CartModel(payload)

     
             await new_product.save()
     

        res.send({"msg":"products has been save"})
    }catch(err){

        res.send({"msg":"invalid"})
    }
})


CartRoute.delete("/delete/:id",async(req,res)=>{



        const id=req.params.id


        try{

           

                await CartModel.findByIdAndDelete({"_id":id})

                res.send({"msg":"products is deleted"})
            
        
        }catch(err){

            console.log(err)

          
        }
   
})
module.exports={
    CartRoute
}


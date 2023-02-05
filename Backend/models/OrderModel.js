const mongoose=require("mongoose")

const OrderSchema=mongoose.Schema({
    _id:String,
    title:String,
    image:String,
    brand:String,
    category:String,
    Rating:Number,
    payment:Boolean,
    price:Number,
   email:String,
   count:Number,
   address:String,

})

const OrderModel=mongoose.model("orders",OrderSchema)

module.exports={

    OrderModel
}
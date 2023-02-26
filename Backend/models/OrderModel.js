const mongoose=require("mongoose")

const OrderSchema=mongoose.Schema({
    ProductId:String,
    title:String,
    image:String,
    brand:String,
    category:String,
    Rating:Number,
    payment:Boolean,
    price:Number,
   email:String,
   OrderedBy:String,
   Mobile:Number,
   count:Number,
   address:String,
   deliverStatus:Boolean

})

const OrderModel=mongoose.model("orders",OrderSchema)

module.exports={

    OrderModel
}

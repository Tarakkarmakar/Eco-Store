const mongoose=require("mongoose")

const Cartshema=mongoose.Schema({
    _id:String,
    title:String,
    image:String,
    brand:String,
    category:String,
    RatingCount:Number,
    Rating:Number,
    price:Number,
    off:Number,
    madein:String,
   email:String,
   count:Number

})

const CartModel=mongoose.model("cart",Cartshema)

module.exports={

    CartModel
}
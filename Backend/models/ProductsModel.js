const mongoose=require("mongoose")

const ProductShema=mongoose.Schema({

    title:String,
    image:String,
    brand:String,
    category:String,
    RatingCount:Number,
    Rating:Number,
    price:Number,
    off:Number,
    madein:String,
    userID:String

})

const productModel=mongoose.model("products",ProductShema)

module.exports={

    productModel
}
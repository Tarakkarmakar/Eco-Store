const mongoose=require("mongoose")

const CustomerUserSchema=mongoose.Schema({

    name :String,
email :String,
gender:String,
password : String
})

const CustomerUserModel=mongoose.model("customeruser",CustomerUserSchema)

module.exports={

    CustomerUserModel
}
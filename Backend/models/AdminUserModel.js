

const mongoose=require("mongoose")

const AdminuserSchema=mongoose.Schema({

    name :String,
email :String,
gender:String,
password : String
})

const AdminUserModel=mongoose.model("adminuser",AdminuserSchema)

module.exports={

    AdminUserModel
}
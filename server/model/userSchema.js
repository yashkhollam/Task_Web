
const mongoose=require('mongoose')

const user_Schema=mongoose.Schema({
    
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const user_Model=mongoose.model('userdata',user_Schema)

module.exports=user_Model
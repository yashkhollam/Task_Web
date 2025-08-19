const mongoose=require('mongoose')

const Todo_Schema=mongoose.Schema({
    task:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userdata'
    }

})

const Todo_Model=mongoose.model("Todo",Todo_Schema)

module.exports=(Todo_Model);
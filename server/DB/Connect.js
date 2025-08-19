const dotenv=require('dotenv')
const mongoose=require('mongoose')

dotenv.config();
const ConnectMD=async(req,res)=>{
    try{
    // await mongoose.connect(process.env.MongoDB)
     await mongoose.connect(process.env.MongoDB)
    console.log("MongoDB atlas connected Successfully")
    }

    catch(err){
        
        console.log("Failed to connect MongoDB atlas",err)
    }
}

module.exports=(ConnectMD);
const Todo_Model=require('../model/Todo_Schema.js')


const getalltask=async(req,res)=>{
    try{
        const alltask=await Todo_Model.find()

        if(!alltask){
             return res.status(400).json({
            success:false,
            message:"No task found",
          
        })
        }
        return res.status(200).json({
            success:true,
            message:"Get all task successfully",
            data:alltask
        })
    }
    catch(err){
         return res.status(500).json({
            success:false,
            message:"Internal server problem"
         
        })
    }
}


const gettaskbyID=async(req,res)=>{
   try{
        const gettaskbyID=await Todo_Model.findById(req.params.id)
        return res.status(200).json({
            success:true,
            message:"Get task by ID",
            data:gettaskbyID
        })
   }
   catch(err){
    console.log(err)
     return res.status(500).json({
            success:false,
            message:"Failed to get task by ID",
            
        })
   }
}


const gettaskbyuserID=async(req,res)=>{
   try{
     //68a173e0ed90ae22ec4dc73d
        const gettaskbyID=await Todo_Model.find({createdby:req.user.userID})
        return res.status(200).json({
            success:true,
            message:"Get task by ID",
            data:gettaskbyID
        })
   }
   catch(err){
    console.log(err)
     return res.status(500).json({
            success:false,
            message:"Failed to get task by ID",
            
        })
   }
}

const createtask=async(req,res)=>{
    try{
       console.log(req.user.userID)
        const {task,deadline}=req.body
        

        if(!task || !deadline){
            return res.status(401).json({
                success:false,
                message:!task ?"Task is required" :"Deadline is required"
            })

           
        }
      
        const createdtask=await Todo_Model.create({task,deadline,createdby:req.user.userID})
        return res.status(201).json({
            success:true,
            message:"Task created successfully",
            data:createdtask,
            
           
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
                success:false,
                message:err.message
            })
    }
}

const updatetask=async(req,res)=>{
    try{
        const {task}=req.body;

    
        const updatedtask=await Todo_Model.findByIdAndUpdate(req.params.id,{task},{new:true})

        return res.status(200).json({
            succ:true,
            message:"Task Updated successfully",
            data:updatedtask
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).json({
                success:false,
                message:"Internal server problem"
            })
    }
}


const deletetask=async(req,res)=>{
    try{
        const deletedtask=await Todo_Model.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            success:true,
            message:"Task Deleted successfullly",
            data:deletedtask
        })
    }

catch(err){
    console.log(err)
    return res.status(500).json({
        success:false,
        message:"Internal server problem"
    })
}
}

module.exports={createtask,getalltask,gettaskbyID,updatetask,deletetask,gettaskbyuserID}
const joi=require("joi")


const SignupMiddleware=async(req,res,next)=>{
    const Schema=joi.object({
         username:joi.string().min(3).max(100).required(),
         email:joi.string().email({tlds:false
            
         }).required(),
         password:joi.string().min(4).max(50).required()
    })

    const {error}=Schema.validate(req.body)

    if(error){
        return res.status(400).json({
            success:false,
            message:error.details[0].message
        })
    }
    next()
}

const LoginMiddleware=async(req,res,next)=>{
    const Schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().max(50).min(4).required()
    })

    const {error}=Schema.validate(req.body)
   
    if(error){
        return res.status(401).json({
            success:false,
            message:error.details[0].message
        })
    }
    next()

}

module.exports={SignupMiddleware,LoginMiddleware}
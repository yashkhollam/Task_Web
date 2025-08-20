const joi=require("joi")


const SignupMiddleware=async(req,res,next)=>{
    const Schema=joi.object({
         username:joi.string().min(3).max(100).required(),
         email:joi.string().pattern(/^[\w._%+-]+@[A-Za-z0-9.-]+\.(com|in|org)$/i).required(),   //minDomainSegments: 2 → requires at least "gmail.com" (one @ + two domain parts).
// tlds: { allow: ['com','in','org'] } → requires a

// real.com,.org,.in, etc.

// So gmail alone fails, but gmail. com passes
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
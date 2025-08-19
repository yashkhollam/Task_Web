const user_Model=require('../model/userSchema.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const Signup=async(req,res)=>{
    const {username,email,password}=req.body
    console.log(username)

    try{
    const user=await user_Model.findOne({email})

    if(user){
        return res.status(401).json({
            success:false,
            message:"User already exist!! Please Login"
        })
    }
     const hashpassword=await bcrypt.hash(password,10)
    const newuser= await user_Model.create({username,email:email.toLowerCase(),password:hashpassword})


    return res.status(201).json({
        success:true,
        message:"User created successfully",
        data:newuser
    })
        //  newuser=await bcrypt.hash(password,10)
        // await newuser.save()
   
}
catch(err){
    console.log(err)
    return res.status(500).json({
        success:false,
        message:"Internal server Problem",
       
    })


}
}

const Login=async(req,res)=>{
  try{
    const {email,password}=req.body

    console.log("req.body=>",req.body)
    

    

    

    const user=await user_Model.findOne({email:email.toLowerCase()})

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User not found"
        })
    }

    const ispasswordequal=await bcrypt.compare(password,user.password)

    if(!ispasswordequal){
        return res.status(401).json({
            success:false,
            message:"Inccorrect Password"
        })
    }

    const JWTTOKEN=jwt.sign({userID:user._id,  username:user.username},
    process.env.JWTSECRET,
    {expiresIn:"24h"}
    )

    return res.status(200).json({
        success:true,
        message:"Login Successfully",
        jwt_token:JWTTOKEN,
        username:user.username,
        data:user
    })
    
}
catch(err){
    console.log(err)
}
}


module.exports={Signup,Login}
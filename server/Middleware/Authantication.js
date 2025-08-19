const jwt=require('jsonwebtoken')

const verifytoken=(req,res,next)=>{
    try{
       const authheaders= req.headers['authorization'];
       const token=authheaders&&authheaders.split(' ')[1];
      
       if(!token){
       return res.status(401).json({
            success:false,
            message:"Unauthorize token or wrong token"
        })
    }

        const decoded=jwt.verify(token,process.env.JWTSECRET)
        req.user=decoded;
        

        next()
       }
    
    catch(err){
        
         return res.status(401).json({
            success:false,
            message:"Inalid or expired token"
         }) 
    }
}


module.exports=verifytoken
const express=require('express')
const { SignupMiddleware, LoginMiddleware } = require('../Middleware/userAuth')
const { Signup, Login } = require('../controller/LoginSignup')
const userroute=(express.Router())

userroute.post('/signup',SignupMiddleware,Signup)
userroute.post('/login',LoginMiddleware,Login)

module.exports=userroute
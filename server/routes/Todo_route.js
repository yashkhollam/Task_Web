const express=require('express')
const {createtask,getalltask, gettaskbyID, updatetask, deletetask, gettaskbyuserID} = require('../controller/Todo_Controller')
const verifytoken = require('../Middleware/Authantication')
// const verifytoken = require('../Middleware/Authantication')
const route=(express.Router())


route.get('/getalltask',getalltask)
route.get('/gettaskbyID/:id',gettaskbyID)
route.get('/gettaskbyuserID',verifytoken,gettaskbyuserID)
route.post('/create',verifytoken,  createtask)
route.patch('/updatedtask/:id',updatetask)
route.delete('/deletetask/:id',deletetask)

module.exports=route
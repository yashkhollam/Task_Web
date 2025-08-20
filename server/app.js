
const dotenv=require('dotenv')
// const mongoose=require('mongoose')
const ConnectMD=require('./DB/Connect.js')
const express=require('express')
const app=(express())
const route=require('./routes/Todo_route.js')
const userroute=require('./routes/user.js')
const cors=require('cors')

dotenv.config()
const PORT=process.env.PORT;

ConnectMD()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use(cors({
  origin: "*", // or your frontend URL
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));


app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to Todo_web"
    })
})

app.use('/task',route)
app.use('/auth',userroute)

app.listen(PORT,()=>{
    console.log(`Server started in PORT :${PORT}`)
})
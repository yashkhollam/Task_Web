import React, { useState } from 'react';
import '../CSS/Signup.css';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';


function Signup() {
  
  const navigate=useNavigate()
  const data={
    username:"",
    email:"",
    password:""
  }

  const [input,setinput]=useState(data)

  const handleinput=async(e)=>{
    const {name,value}=e.target
   console.log({...input,[name]:value})
   setinput({...input,[name]:value})
  }

  const submitform=async(e)=>{
  e.preventDefault()
  try{
       const response=await axios.post("http://localhost:8989/auth/signup",input)
      

     const {message}=response.data
     toast.success(message)
     
     setinput({username:"",
    email:"",
    password:""})

    navigate('/login')


  }
  catch(err){
    console.log(err)

    const message=err?.response?.data[0]?.message
   console.log(message)
   
  //   toast(message,{
  //     icon:"⚠️"
  //   })
   }
  }


  return (
   <>
   <div className="container min-vh-100 border d-flex  justify-content-center align-items-center">
   
    <div className="row w-100 mt-3  shadow rounded" style={{minHeight:"500px",maxWidth:"500px",marginBottom:"120px"}}>
     
      <div className="col-12">
       
        <form className='form p-2' onSubmit={submitform}>
           <h1 className='text-center mt-4'>Create Account</h1>
        
           <label className='form-label mt-4' style={{fontSize:"1.3rem"}}>Username :</label>
           <input type="text"
                  name="username"
                  value={input.username}
                   onChange={handleinput}
                  className='form-control' />

             <label className='form-label mt-2' style={{fontSize:"1.3rem"}}>Email :</label>
           <input type="email"
                  name="email"
                  value={input.email}
                   onChange={handleinput}
                  className='form-control' />

            <label className='form-label mt-2' style={{fontSize:"1.3rem"}}>Password :</label>
           <input type="password"
                  name="password"
                  value={input.password}
                  onChange={handleinput}
                  className='form-control' 
                  autoComplete='new-password'/>

          <button id='signupbtn' type='submit'>Signup</button>
         
         
          <p className='mt-3 ' style={{fontSize:"1.2rem"}}>Already have account <Link  className='ms-52' to={'/login'}>Login</Link>  </p>
        </form>
      </div>
    </div>
   </div>
    





   </>
  )
}

export default Signup
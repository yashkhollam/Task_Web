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
   const [isloading,setIsloading]=useState(false)

  const handleinput=async(e)=>{
    const {name,value}=e.target
  //  console.log({...input,[name]:value})
   setinput({...input,[name]:value})
  }

  const submitform=async(e)=>{
  e.preventDefault()
  try{
      setIsloading(true)
      //  const response=await axios.post("http://localhost:8989/auth/signup",input)

      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`,input)

     const {message}=response.data
     toast.success(message)
     
     setinput({username:"",
    email:"",
    password:""})

    navigate('/login')


  }
  catch(err){
    const message=err?.response?.data?.message
    toast.error(message,{
      icon:"⚠️"
    })

    setIsloading(false)
   }
  }


  return (
   <>

  {

isloading&&
 <div id='spinner-container'>
    
    <div class="spinner-border" role="status" id='spinner'></div>

 </div>
}

   <div className="container"  id='container'>
   
    <div className="row w-100 mt-5 rounded shadow "  style={{minHeight:"500px",maxWidth:"400px",marginBottom:"150px"}}>
        

      <div className="col-12 p-0 m-0"  >
      
       
        <form className='form  p-4' onSubmit={submitform} >
           <h2 className='text-center p-2'>Create Account</h2>
        
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
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../CSS/Signup.css'
import axios from 'axios'
import { AuthContext } from './ContextProvider'


function Login() {
 const {setAuth}=useContext(AuthContext)
  const navigate=useNavigate()
  const data={
    email:"",
    password:""
  }

  const[input,setInput]=useState(data)

  const handleinput=(e)=>{
  const {name,value}=e.target
  console.log({...input,[name]:value})
  setInput({...input,[name]:value})
  }

  const submitform=async(e)=>{
    e.preventDefault()
    try{
      //  const response=await axios.post("http://localhost:8989/auth/login",input)
       const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,input)






      
      console.log(response.data)
      const {message,jwt_token,username}=response.data;
      console.log(jwt_token,username)

      localStorage.setItem('username',username);
      localStorage.setItem('token',jwt_token);

      toast.success(message)
  
      setInput({email:"",password:""})
      setAuth({username:username,token:jwt_token})
       navigate('/home')
    }
    catch(err){
     console.log(err)
      // toast.error(err.response.data[0].message)
    }
  }

  // const gotosignup=()=>{
  //  navigate('/signup')
  
  // }

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      
      <div className="row shadow w-100" style={{minHeight:"450px",maxWidth:"500px",marginBottom:"150px"}}>
       
        <div className="col-12 ">
          <form className='form p-3' onSubmit={submitform}>
            <h1 className='text-center  p-4'>Login</h1>
           
            <label style={{fontSize:"1.3rem"}}>Email :</label>
            <input type="email"
             name="email"
             className='form-control mt-2'
             value={input.email}
             onChange={handleinput} />
         
            <label className="mt-3" style={{fontSize:"1.3rem"}} >Password :</label>
            <input type="password"
             name="password"
              className='form-control mt-2'
             value={input.password}
             onChange={handleinput} />
           
           <button type='submit' id='signupbtn' >login</button>

           <p className='mt-4' style={{fontSize:"1.2rem"}}>Create Account  <Link to={'/signup'} className='ms-1' >Signup</Link></p>
         
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
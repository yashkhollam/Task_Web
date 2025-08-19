import React, { createContext, useEffect, useState } from 'react'


export const AuthContext=createContext()


function ContextProvider({children}) {


  const [auth,setAuth]=useState({username:"",token:""})  

    useEffect(()=>{
        const username=localStorage.getItem('username')
        
        const token=localStorage.getItem('token')

        if(username){
       setAuth({username:username,token:token})
        
        }
       
       
        
    },[])
    
  
 const logout=()=>{
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        setAuth({username:"",token:""})
       
    }

    
    

  return (
    <AuthContext.Provider value={{auth,setAuth,logout}}>
        {children}</AuthContext.Provider>
  )
}

export default ContextProvider
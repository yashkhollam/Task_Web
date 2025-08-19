import React, { createContext, use, useEffect, useState } from 'react'


export const AuthContext=createContext()


function ContextProvider({children}) {


  const [auth,setAuth]=useState({
      username:localStorage.getItem('username') || "",
       token:localStorage.getItem('token') || ""

  })  

       
        useEffect(()=>{
          if(auth.username&&auth.token){
            localStorage.setItem('username',auth.username);
            localStorage.setItem('token',auth.token);
          }
          else{
            localStorage.removeItem('username');
            localStorage.removeItem('token');
          }
        },[auth]);
       
       
        

    
  
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
import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './ContextProvider'

function ProtectedRoutes({children}) {
    const {auth}=useContext(AuthContext)
    
        

        if(!auth.username&&!auth.token){
          return <Navigate to={'/login'} replace/>
        }
   
  return (
    <>{children}</>
  )
}

export default ProtectedRoutes
import React, { useContext } from 'react'
import '../CSS/navbar.css'
import  {useNavigate} from 'react-router-dom'
import { AuthContext } from './ContextProvider'



function Navbar() {


   const navigate=useNavigate()

    const  {auth,logout}=useContext(AuthContext)
   


  return (
    <>
      <div className="container-fluid" id='form-container'>
        <div className="row" id='row'>
         
          <div className="col-12"  id='column'>
           
            <div className="nav" id='navbar'>
               
                <ul id='nav-group' className='d-flex'>
                   <div className='d-flex gap-2 ms-5' id='nav-container'>
                    <li>Welcome</li>
                    {
                      auth.username ?(
                        <>
                          <li >{auth.username.toUpperCase()}</li>

                           <li id='logout' onClick={()=>logout(navigate('login'))}><i className="bi bi-arrow-right-circle-fill" id='logout-icon'></i></li>
                        
                        </>
                      
                      ):(<li className='text-warning'>Please Login to Add the task</li>)
                    }


                   </div>
                    {/* <li id='logout-icon'><i class="bi bi-arrow-right-circle-fill"></i></li> */}
                  
                   
                </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
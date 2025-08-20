import React, { useContext } from 'react'
import '../CSS/navbar.css'
import  {useNavigate} from 'react-router-dom'
import { AuthContext } from './ContextProvider'



function Navbar() {


   const navigate=useNavigate()

    const  {auth,logout}=useContext(AuthContext)
   


  return (
    <>
      {/* <div className="container-fluid p-0 m-0" id='form-container'>
        <div className="row" id='row'>
         
          <div className="col-12"  id='column'>
           
            <div className="nav" id='navbar'>
               
                <ul id='nav-group' className='d-flex'>
                   <div className='d-flex gap-2 ' id='nav-container'>
                    <li>Welcome</li>
                    {
                      auth.username ?(
                        <>
                          <li >{auth.username.toUpperCase()}</li>

                           <li id='logout' onClick={()=>logout(navigate('login'))}><i className="bi bi-arrow-right-circle-fill" id='logout-icon'></i></li>
                        
                        </>
                      
                      ):("")
                    }


                   </div>
                  
                  
                   
                </ul>
            </div>
          </div>
        </div>
      </div> */}





       <div className="container-fluid  p-0 m-0">
        <div className="row p-0 m-0">
          <div className="col-12 p-0 m-0">
             <nav id='navbar' >
              <ul className='d-flex p-0 m-0' id='nav-group'>
               
                  <li className='d-flex gap-3'>Welcome  
                    
                    
                    <p className='p-0 m-0'>
                    {auth.username ? auth.username.toUpperCase() :""}
                    
                
                    </p></li>
               
                <li id='logout' onClick={()=>logout(navigate('login'))}><i className="bi bi-arrow-right-circle-fill" id='logout-icon'></i></li>
              </ul>
             </nav>
          </div>
        </div>
       </div>
    </>
  )
}

export default Navbar
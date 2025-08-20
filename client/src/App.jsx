
import './App.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'

import Home from './Component/Home'

import {Toaster} from 'react-hot-toast'
import Navbar from './Component/Navbar'
import Signup from './Component/Signup'
import Login from './Component/Login'
import ProtectedRoutes from './Component/ProtectedRoutes'
// import ProtectedRoutes from './Component/ProtectedRoutes'

function App() {


  return (
   <>

     <BrowserRouter>
     <Toaster/>
     <Navbar/>
       <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/home' 
        element={
           <ProtectedRoutes>
            <Home/>
           </ProtectedRoutes>
            
       
        
        }/>
        

        <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/>
       </Routes>

     </BrowserRouter>
   </>
  )
}

export default App

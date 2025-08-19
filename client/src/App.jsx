
import './App.css'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import CreateTask from './Component/createTask'
import Home from './Component/Home'
import UpdateTask from './Component/update'
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
        <Route path='/createtask' element={<CreateTask/>}/>
        <Route path='/updatetask/:id' element={<UpdateTask/>}/>

        <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/>
       </Routes>

     </BrowserRouter>
   </>
  )
}

export default App

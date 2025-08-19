import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../CSS/home.css'
import { AuthContext } from './ContextProvider'

function Home() {
  const {auth}=useContext(AuthContext)

  const data={
    task:"",
    deadline:""
    
  }

  const [task,setTask]=useState([])
  const [iseditdialogopen,setIseditdialogopen]=useState(false)
  const [iscreateTask,issetCreateTask]=useState(data)
  const [isupdateTask,setIsupdateTask]=useState(data)
 const [editID,setIseditid]=useState(null)


  
  
  //fetch the task
     const fetchtask=async()=>{
  try{
    //  const response=await axios.get(`http://localhost:8989/task/gettaskbyuserID`,{

    const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/gettaskbyuserID`,{
    
      headers:{
        Authorization:`Bearer ${auth.token}`
      }
    })

    console.log(response.data.data)

    setTask(response.data.data)
    return(response.data.data)
   
    
  }
  catch(err){
    console.log(err)
  }
}



useEffect(()=>{
  fetchtask()
},[])

//create task

  const handleinput=(e)=>{
    console.log({...iscreateTask,[e.target.name]:e.target.value})
    issetCreateTask({...iscreateTask,[e.target.name]:e.target.value})
  }




  const createtask=async()=>{
    try{
    
    const token= localStorage.getItem('token')
    // const response= await axios.post(`http://localhost:8989/task/create`,iscreateTask,{
   
    const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/task/create`,iscreateTask,{

    headers:{
      Authorization:`Bearer ${token}`,
    }
   })

      issetCreateTask({task:"",deadline:""})
    
      const {message}=response.data
    toast.success(message)
     
    await fetchtask()
  }
  catch(err){
    console.log(err)
  
     toast(err.response?.data.message,{
    icon:"⚠️" 
  })
  }
}


//update task

const  openedit=async(id)=>{
  
  try{
        setIseditdialogopen(!iseditdialogopen)
        setIseditid(id)

          //  const response=await axios.get(`http://localhost:8989/task/gettaskbyID/${id}`)

          const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/gettaskbyID/${id}`)

  const data=response.data.data;
  setIsupdateTask({task:data.task,deadline:data.deadline})


   
}
    catch(err){
      console.log(err)
    }
  }


const handleupdate=(e)=>{
 
  try{
 
    setIsupdateTask({...isupdateTask,[e.target.name]:e.target.value})
  }
  catch(err){
    console.log(err)
  }
}

const submitupdatedata=async(e)=>{
  e.preventDefault()
 
 try{
    //  await axios.patch(`http://localhost:8989/task/updatedtask/${editID}`,isupdateTask)

    const response= await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/task/updatedtask/${editID}`,isupdateTask)

   toast.success("update successfully")
   setIseditdialogopen(false)//close dialog
   await fetchtask()
 }
 catch(err){
  console.log(err)
 }
}







//delete task

  const deletetask=async(taskid)=>{
    try{
      //  const response= await axios.delete(`http://localhost:8989/task/deletetask/${taskid}`)
       const response= await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/deletetask/${taskid}`)

       setTask(prev=>prev.filter((item)=>item._id!==taskid))
       
       const{message}=response.data
       toast.success(message)
    }
    catch(err){
      console.log(err)
     
    }
  



  }

  // const navigate=useNavigate()

  // const gotoupdatetask=(task_id)=>{
  //   navigate(`/updatetask/${task_id}`)
  // }

  // const gotoupdatetask=(task_id)=>{
  //   try{
  //       setIseditdialogopen(!iseditdialogopen)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }




   
  return (
   <>

  <div className="container mt-2" >
    <div className="row " >
      <div className="col-12  " id='col-container'>
       
       <div className='input-container ' id='input-container'>

       
        <input type="text" 
       
        placeholder='Add the Task'
        className='form-control p-3' style={{height:"50px",maxWidth:"500px"}}
        onChange={handleinput}
        name='task'
        value={iscreateTask.task}/>



        <input type="date"
         required
         className='form-control'  style={{height:"50px", width:"170px"}}
          onChange={handleinput}
          name='deadline'
          
          value={iscreateTask.deadline}
          />

         <button className='btn bg-success text-light h-100 fs-4 p-2' type='button' onClick={createtask}>Create</button>


       </div> 
      </div>
    </div>
  </div>


   <div className="container mt-5">
    <div className="row">
      <div className="col-12">
          
           <table className='table table-bordered'>
      <thead className='text-center'>
        <tr>
         
          <th style={{width:"750px"}}>Task</th>
         
          <th style={{maxWidth:"120px",width:"150px"}}>deadline</th>
          <th  style={{width:"100px"}}> Action</th>
        </tr>
      </thead>
      <tbody className='text-center'>
        
          
         {
          Array.isArray(task)&&task.length>0?(
           task.map((data)=>(
             <tr key={data._id}>
              
                <td>{data.task}</td>
               
                <td>{data.deadline}</td>
                <td className='d-flex align-items-center justify-content-center gap-3' style={{maxWidth:"200px"}}>
                 
                
                 
                  <button className='btn bg-warning' onClick={()=>{openedit(data._id)}}>Edit</button>
                 
                 
                  <button className='btn bg-danger text-light' onClick={()=>{deletetask(data._id)}}>Delete</button>
                </td>
              
             </tr>
           ))


          ):(
           <h1 className='heading'>No task Found</h1>
          )
          
          }
          
        
       


        {/* <tr>
          <td>make tea</td>
          <td>pending</td>
          <td>12</td>
          <td className='d-flex justify-content-center gap-4'>
             
                 <input type="checkbox"/>
            <button className='btn bg-warning '>Edit</button>
            <button className='btn bg-danger text-light'>Delete</button>
              
          </td>
        </tr> */}
      </tbody>
    </table>
      </div>


       <div className="dialog" id="dialog1" >
                <div className="dialog-container " id='dialog-container'>
                  {
                    iseditdialogopen &&
                    <div className="" id='edit-container'>
                     <h1 className='mt-4 text-center' >Update Task</h1>
                    <form onSubmit={submitupdatedata}>
                      <label className='form-label fs-4 ms-3'>Task :</label>
                      <input type="text"
                             className='form-control ms-3'
                             style={{maxWidth:"380px"}} 
                             onChange={handleupdate}
                             value={isupdateTask.task}
                             name='task'/>

                      <label className='form-label fs-4 mt-4 ms-3'>Deadline :</label>
                      <input type="date"
                             className='form-control ms-3'
                             style={{maxWidth:"380px"}}
                              onChange={handleupdate}
                             value={isupdateTask.deadline}
                             name='deadline' />

                         <div className='btn-container d-flex  justify-content-center gap-4'>
                        
                         <button onClick={()=>{setIseditdialogopen(false)}}className='button bg-danger'>cancle</button>  
                       
                        <button type='submit' className='button' >Update</button>
                       </div>
                    </form>
                     
                    </div>
                  }
                </div>
              </div>
    </div>
   </div>
    


      {/* <div className="container-fluid " id='edit-container'>
          <div className="row">
            <div className="col-12">
              <div className="dialog" id="dialog1" >
                <div className="dialog-container bg-dark">
                  {
                    iseditdialogopen &&
                    <div className="text-light">
                      <p>edit your task</p>
                      <button onClick={()=>{setIseditdialogopen(false)}}>cancle</button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>  */}
   </>
  )
}

export default Home
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UpdateTask() {
 const {id}=useParams()

 const data={
  task:"",
  deadline:""
 }
 const[task,setTask]=useState(data)
 
 const fetchtask=async()=>{
  // const response=await axios.get(`http://localhost:8989/task/gettaskbyID/${id}`)
  const response=await axios.get(`${process.env.VITE_API_URL}/task/gettaskbyID/${id}`)

  const data=response.data.data
  setTask({task:data.task,deadline:data.deadline})



  
 }

 useEffect(()=>{
  fetchtask()
 },[])


  return (
    <>
      <div className="container ">
        <div className="row ">
          <div className="col-12">
            <input type="text"
                    className='form-control mt-5'
                    name='task'
                    value={task.task}/>

             <input type="date"
                    className='form-control'
                    name='deadline'
                    value={task.deadline}
                     />

              <button className='btn bg-success text-light text-center mt-5 ' onClick={()=>{updatetask(task._id)}}>Update</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdateTask
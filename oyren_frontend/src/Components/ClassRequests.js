import  {useEffect} from 'react'
import axios from 'axios'
import {config} from './axios'
import BASE_URL  from './axios'
import { useState } from 'react'
import Style from '../styles/ClassRequests.module.css'

const ClassRequests=(props)=>{
    console.log('CLass request rendered')
    const [requests,set_requests] =  useState([])
   
    const accept_student=(class_id,student_id,e)=>{
        let ev=e;
       
      
        let data={
            'student_id':student_id,
            'class_id':class_id
        }
        axios.post(`${BASE_URL}/assign_student_to_class/`,data,config)
        .then(()=>{
           
            ev.target.parentElement.parentElement.style.display='none'
           
        })
        
    }

    const reject_student=(class_id,student_id,e)=>{
        let data={
            'requested_class':class_id,
            'requesting_student':student_id
        }
        console.log(data)
        axios.post(`${BASE_URL}/delete_request/`,data,config)
        .then(()=>{
           
            e.target.parentElement.parentElement.style.display='none'
           
        })
      

    }




    useEffect(()=>{
        let data={
            'class_name':props.class_name
        }
        axios.post(`${BASE_URL}/get_class_requests/`,data,config) 
        .then((res)=>{
            console.log("the data is")
            console.log(res.data)
    
            set_requests(
              res.data.map(element=>
             
                  <div>
                        <p>{element.student_name}</p>   
                         <div> <button onClick={(e)=>{accept_student(element.requested_class,element.requesting_student,e)}}>ACCEPT</button> 
                         <button
                          onClick={(e)=>{reject_student(element.requested_class,element.requesting_student,e)}}>
                                               REJECT
                              </button></div>
                  </div>
              
                
                )
                
            )
              }
        )

    },[])


    return(
        <>
       <div className={Style.request_container}>
           {requests}
       </div>
        </>
    )

}

export default ClassRequests
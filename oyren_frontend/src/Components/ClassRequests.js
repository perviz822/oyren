import  {useEffect} from 'react'
import axios from 'axios'
import {config} from './axios'
import BASE_URL  from './axios'
import { useState } from 'react'
import Style from '../styles/ClassRequests.module.css'

const ClassRequests=(props)=>{
    console.log('CLass request rendered')
    const [requests,set_requests] =  useState([])
    console.log(requests)
    useEffect(()=>{
        let data={
            'class_name':props.class_name
        }
        axios.post(`${BASE_URL}/get_class_requests/`,data,config)
        .then((res)=>{
            console.log(res.data)
    
            set_requests(
              res.data.map(element=>
             
                  <div>
                        <p>{element.student_name}</p>    <div> <button>ACCEPT</button>  <button>REJECT</button></div>
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
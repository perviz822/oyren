import axios from "axios"
import { useState,useRef } from "react"
import { useEffect } from "react";
import BASE_URL from "./axios"
import { config } from "./axios";
import Style from '../styles/StudentHome.module.css'
const  GetClasses=(props)=>{
    console.log(config)
    console.log(props.searched_class)
    const [Class,set_Class]=useState({name_of_class:'', class_id:''});
    const send_joining_request=()=>{
        let data={
            'requested_class':Class.class_id,
            'requesting_student':props.student_id
        }
        console.log(data)

        axios.post(`${BASE_URL}/handle_class_request/`,data,config)
        .then((res)=>{
           alert('Request to join the class succesfully sent')
           return res
        })
        .catch((res)=>{
            console.log(res.response.status)
            if(res.response.status==500){ 
                alert('You have already sent the request')                       
            }
        })
    } 
    let data={
        'key':props.key_name
    } 
    useEffect(()=>{
        axios.post(`${BASE_URL}/list_of_classes/`,data,config)
        .then((res)=>{
         console.log(res)
            set_Class(
               { name_of_class: res.data.name,
                
                 class_id:res.data.id
               }
               
            )
        })  
    },[])

    return (
        <>
       <div className={Style.class}>
         {Class.name_of_class}
         <button onClick={send_joining_request}>Send request</button>
       </div>
        </>
    )

}

export default GetClasses
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react";
import BASE_URL from "./axios"
import { config } from "./axios";
const  GetClasses=(props)=>{
    const [Class,set_Class]=useState({name_of_class:[], class_id:''});
    
    const send_joining_request=()=>{
        let data={
            'requested_class':Class.class_id,
            'requesting_student':props.student_id
        }
        console.log(data)

        axios.post(`${BASE_URL}/handle_class_request/`,data,config)
        .then((res)=>{
            console.log(res.status)

        })
    }
   
    let data={
        'key':props.key_name
    } 
    useEffect(()=>{
        axios.post(`${BASE_URL}/list_of_classes/`,data,config)
        .then((res)=>{
            console.log(res.data)
            set_Class(
               { name_of_class: res.data.map(element=>
                    <p>{element.name}</p>
                ),
                 class_id:res.data[0].id
               }
               
            )
        })
    },[])

    return (
        <>
       <div>
         {Class.name_of_class}
         <button onClick={send_joining_request}>Send request</button>
       </div>
        </>
    )

}

export default GetClasses
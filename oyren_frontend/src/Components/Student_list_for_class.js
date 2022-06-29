import { useState } from "react"
import { useEffect } from "react"
import BASE_URL from "./axios"
import { config } from "./axios"
import Class from "./Class"
import axios from "axios"
import Style from '../styles/Url_container.module.css'
import link_logo  from '../images/link_logo.png'



const Student_list_for_class=(props)=>{
    const[students,set_students] =useState([])
    const log_out_user=(user_id)=>{
       
        let  data={
            'user_id':user_id
        }
        axios.post(`${BASE_URL}/log_out_student/`,data,config)
    }
    useEffect(()=>{
        let data={
           'class_id':props.class_id
       }
       axios.post(`${BASE_URL}/get_students_of_class/`,data,config)
       .then((res)=>{
           set_students(
               res.data.map(element=>
                <tr style={{border:'1px black solid'}}>
                    <td style={{border:'1px solid black'}}>{element.name}</td>
                    <td style={{border:'1px solid black'}}>  {element.email}</td>
                    <td style={{border:'1px solid black'}}>   <button onClick={()=>{log_out_user(element.id)}}>Log out</button></td>
                </tr>

           
                   )
           )
       })
   },[])

    return (
        <>
      <table style={{marginLeft:'auto',marginRight:'auto'}} >
      {students}  
    </table>
           
        

        </>
    )

}

export default  Student_list_for_class
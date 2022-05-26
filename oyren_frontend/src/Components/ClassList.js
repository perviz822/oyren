import axios from 'axios'
import { useState } from 'react'
import  BASE_URL from './axios'
import {config} from './axios'
import {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Style from '../styles/StudentHome.module.css'



const ClassList =(props)=>{
    const[list_of_classes,set_list_of_classes]=useState([]);
    console.log(config.headers.Authorization)
  useEffect(()=>{
    axios.get(`${BASE_URL}/get_classes_for_teacher/`,config)
    .then((res)=>{
     set_list_of_classes(
         res.data.map(element=> <Link to ={`/teacher_home_page/*/list_of_classes/${element.name}`}>{element.name}</Link>)
     )     
    })

  },[JSON.stringify(list_of_classes)])
    return (
        <>
       <ul className={Style.list}>
       {list_of_classes}
       </ul>
     </>
    
  )
}
export default ClassList
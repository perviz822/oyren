import { useState } from "react"
import { useEffect } from "react"
import BASE_URL from "./axios"
import { config } from "./axios"
import Class from "./Class"
import axios from "axios"
import Style from '../styles/Url_container.module.css'
import link_logo  from '../images/link_logo.png'


const Class_Materials=(props)=>{
    const[urls,set_urls] =useState([])
    console.log('class materials is rendered')

    useEffect(()=>{
         let data={
            'class_id':props.class_id
        }
        axios.post(`${BASE_URL}/get_urls_of_class/`,data,config)
        .then((res)=>{
            set_urls(
                res.data.map(element=>
              <div> <img  style={{maxWidth:'40px',maxHeight:'40px'}} src={link_logo}></img><a style={{display:'block'}} href={`${element.url}`}> {element.url}   </a></div>
                    )
            )
        })
    },[])

    return (
        <>
        <div className={Style.url_container}>
        {urls}
        </div>
        </>
    )
}

export default Class_Materials
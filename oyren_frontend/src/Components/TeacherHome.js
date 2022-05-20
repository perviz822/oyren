import profile_src from '../images/profile.png'
import tick_src from  '../images/tick.png'
import magnifier_src from '../images/magnifier.png'
import Style from '../styles/StudentHome.module.css'
import add_class_src from '../images/add_class.png'
import { useState } from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import Class from './Class'
import { useLocation, useNavigate } from 'react-router'
import CreateClass from './CreateClass'
import { useMemo } from 'react'
import Send_file from './Send_file'

const TeacherHome=()=>{
const  history= useNavigate();
const  location=useLocation();
const  location_object=useMemo(()=>location,[])
const[is_toggled,set_toggled]= useState(false)
const[is_create_class_toggled,set_is_create_class_toggled]= useState(false)
const[is_class_created,set_is_class_created]= useState(false)
const[is_url_added,set_url_added]=useState(false)
const [created_class_id,set_created_class_id]=useState('')
console.log("rendered")
console.log([is_class_created,is_url_added])


const toggle=()=>{
    set_toggled(!is_toggled)
}
const createClass=()=>{
    set_is_create_class_toggled(!is_create_class_toggled)
    history('/teacher_home_page/class')
}

let line1_class = is_toggled ? Style.line1_tranformed :Style.line1
let line2_class = is_toggled ? Style.line2_transformed :Style.line2
let menu_class =Style.menu
let transformed= ' ';
let left_menu_transformed= ' ';

if (is_toggled){
   transformed=Style.menu_transformed
   left_menu_transformed=Style.left_menu_transformed
}
else{
    transformed= ' '
    left_menu_transformed= ' '    
}

    return(
        <>

{/*left menu bar */}
 <div className={Style.left_menu  +  " " + left_menu_transformed}> {/*adding and removing class on toggle*/}
</div>
{/*left menu bar */}

      <div className={Style.header}>
          {/*menu icon*/}
          <div onClick={toggle}  className={menu_class + ' ' + transformed}>
            <div className={line1_class}></div>
            <div className={line2_class}></div>
          </div>
           {/*menu icon*/}
        <header>

 {/*user_name */}
  <div className={Style.profile_section}>
     <img src={profile_src} />   <div> <img src={tick_src} /></div>
  </div>
{/*user_name */}
        </header>
      </div>

     {!is_class_created &&  <CreateClass set_created_class_id={set_created_class_id}  set_is_class_created={set_is_class_created} is_create_class_toggled={is_create_class_toggled}/>


}
    {is_class_created && !is_url_added &&  <Class set_url_added={set_url_added} />}


   {is_url_added && <Send_file  set_url_added={set_url_added} is_url_added={is_url_added} id={created_class_id}/>}
   {/*background image */}
   {!is_class_created   &&  <img  onClick ={createClass} className={Style.add_class} src={add_class_src}></img> }
   {/*background image */}  


        </>

    )
}



export default TeacherHome
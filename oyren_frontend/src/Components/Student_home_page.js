import profile_src from '../images/profile.png'
import tick_src from  '../images/tick.png'
import magnifier_src from '../images/magnifier.png'
import Style from '../styles/StudentHome.module.css'
import books_src from '../images/books.png'
import { useState } from 'react'
import { useLocation } from 'react-router'
import { useRef } from 'react'
import GetClasses from './GetClasses'


const Student_home_page=()=>{
const[is_toggled,set_toggled]= useState(false)
const inputEl=useRef(null)
const[is_content_searched,set_is_content_searched]=useState(false);
const[refresh_state,refresh]=useState(false)
;
const location =useLocation()

const toggle=()=>{
    set_toggled(!is_toggled)
}
const bring_content=()=>{
    refresh(!refresh_state)
    set_is_content_searched(true);
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

<div className={Style.left_menu  +  " " + left_menu_transformed}>
</div>
      <div class={Style.header}>
      <div onClick={toggle}  className={menu_class + ' ' + transformed}>
            <div className={line1_class}></div>
            <div className={line2_class}></div>
        </div>
        <header>

           <div className={Style.profile_section}>
<img src={profile_src} />   <div> {location.state.name}<img src={tick_src} /></div>
           </div>
        </header>

      </div>
    <div class={Style.input_section}>
        <input ref={inputEl} placeholder="Enter the class id" />
        <img onClick={bring_content} src ={magnifier_src}></img>
    </div>
    {!is_content_searched &&  <img className={Style.books} src={books_src}></img>}
    {is_content_searched &&  
    <GetClasses 
     searched_class={inputEl.current.value}
     student_id={localStorage.getItem('user')}
     key_name={inputEl.current.value} />}

        </>

    )
}

export default Student_home_page
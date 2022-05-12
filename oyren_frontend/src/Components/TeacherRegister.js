import img from '../images/x7.png'
import register from '../images/register-teacher.png'
import logo from '../images/logo.png'
import {Link,Route,Routes }from 'react-router-dom'
import Style from '../styles/Login.module.css'
import axios from 'axios'
const Register = ()=>{
    const registerUser=(e)=>{
        e.preventDefault()
        if(e.target[1].value !==e.target[2].value){
            alert("Passwords do not match")
            return;
        }
        
         let data={
            'email':e.target[0].value,
            'password':e.target[1].value,
            'name':e.target[3].value,
            'surname':e.target[4].value,
            'is_teacher':true

        }
        axios.post('http://127.0.0.1:8000/oyren/register/',data)
        .then((res)=>{
            alert("Succesfully registered , go back  to login")
        }) 
    }

    return (
        <>
      <div className={Style.container}>

       <div className={Style.logoContainer}>
       <img className ={Style.logo} src={logo}></img>
       <img className={Style.background} src={register}></img>
       </div>


<div  className={Style.inputContainer}>
  
    <form  onSubmit={registerUser} className={Style.form2}>
        <input  placeholder="Email"/>
         <input  placeholder="Password"/>
         <input placeholder="Repeat the password"/>
         <input placeholder="Name"/>
         <input placeholder="Surname"/>
        <button  type='submit'>Register </button>
        <Link to={'/'}>Back to login</Link>

    </form>
   
</div>



      </div>


        </>
    )

}

export  default Register
import img from '../images/x7.png'
import register from '../images/register.png'
import logo from '../images/logo.png'
import {Link,Route,Routes }from 'react-router-dom'
import Style from '../styles/Login.module.css'
import BASE_URL from './axios'
import { useNavigate } from 'react-router'
import axios  from 'axios'
const Login = ()=>{
    const history = useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();
        let  data={
            'email':e.target[0].value,
            'password':e.target[1].value
        }
        axios.post(`${BASE_URL}/get_access_token/`,data)
        .then((res)=>{
            localStorage.setItem('access_token',res.data.access)
            localStorage.setItem('refresh_token',res.data.refresh)
           
return res;
        })
        .then((res)=>{
            let access_token=localStorage.getItem('access_token')
            console.log(access_token)
            let config={
                headers:{
                    Authorization: "Bearer"+ " " +  access_token  
                  }
                 }
            axios.get(`${BASE_URL}/get_user_details/`,config)
            .then((res)=>{
             if (res.data.is_teacher){
                history('/teacher_home_page',{state:{name:res.data.user}})
                return res
             }
             else{
                 history('/student_home_page',{state:{name:res.data.user}})
             }
               
               
            })
          
        })
        .catch((res)=>{
            alert("USER CREDENTIALS DID NOT MATCH")
        })

    }

    return (
        <>
      <div className={Style.container}>

       <div className={Style.logoContainer}>
       <img className ={Style.logo} src={logo}></img>
       <img className={Style.background} src={register}></img>
       </div>


<div className={Style.inputContainer}>
    <p  className={Style.welcome}>
        WELCOME TO THE  <br />
        LEARNING  <br />
        PLATFORM!
    </p>
    <form onSubmit={handleSubmit} className={Style.form}>
        <input  placeholder="Email"/>
        <input  placeholder="Password"/>
        <button type='submit'>Log In</button>
        <div className={Style.links}>  
         <Link to={'/register_as_student'}>  <a>Register as student</a></Link>
         <Link to={'/register_as_teacher'}>  <a>Register as teachet</a></Link>
        </div> 
    </form>
   
  
     
  
</div>



      </div>


        </>
    )

}

export  default Login
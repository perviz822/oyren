import magnifier_src from  '../images/magnifier.png'
import Style from '../styles/StudentHome.module.css'
import generate_key from './generate_class_key'
import BASE_URL from './axios'
import axios from 'axios'
const  CreateClass=(props)=>{
    
    const createClass=(e)=>{
        e.preventDefault();
        let data={
            'key':generate_key(10),
            'name':e.target[0].value
        }

        let config={
            headers:{
                Authorization :'Bearer'+' ' + localStorage.getItem('access_token')
            }
        }
        axios.post(`${BASE_URL}/create_class/`,data,config)
        .then((res)=>{
            console.log(res.data)
            props.set_created_class_id(res.data.id);
            props.set_is_class_created(!props.is_class_created);
            alert('class succesfully created')
        })


    }
    
   
    
    return (
        <>
        {/*form*/}
 {props.is_create_class_toggled &&  <form onSubmit={createClass}>
<div class={Style.input_section}>
      <input placeholder="Class name" />
      <img src ={magnifier_src}></img>
      
  </div>
  <button   type='submit'className={Style.create_class_button}>Create Class</button>

</form>}
{/*form */}
        </>
    )
}

export default CreateClass
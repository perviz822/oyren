import axios from "axios";
import BASE_URL from "./axios";
import { config } from "./axios";
import Style from '../styles/StudentHome.module.css'
import { useLocation ,useNavigate} from "react-router";


const Send_file=(props)=>{
    console.log(`The file is to be sent  to the class  + ${props.class_name}`)
    const history =  useNavigate();

    console.log(props.class_id)
    const send_data=(e)=>{
        e.preventDefault();
        let data={
            'class_name':props.class_id,
            'url':e.target[0].value
        }
        axios.post(`${BASE_URL}/create_url/`,data,config)
        .then(()=>{
           
           
        })
        
       

    }

    return <>
    <form   className={Style.form} onSubmit = {send_data}>
       
        <input  type='text'/>
        <button type='submit'>Add URL</button>
    </form>
    </>
}


export default Send_file
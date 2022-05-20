import axios from "axios";
import BASE_URL from "./axios";
import { config } from "./axios";
import Style from '../styles/StudentHome.module.css'
import { useLocation ,useNavigate} from "react-router";


const Send_file=(props)=>{
    const history =  useNavigate();

    console.log(props.id)
    const send_data=(e)=>{
        e.preventDefault();
        let data={
            'class_name':props.id,
            'url':e.target[0].value
        }
        axios.post(`${BASE_URL}/create_url/`,data,config)
        .then(()=>{
            props.set_url_added(!props.is_url_added);
           

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
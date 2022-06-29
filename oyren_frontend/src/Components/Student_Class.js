import Class_Materials from "./Class_materials"
import BASE_URL from "./axios"
import { config } from "./axios"
import Style from '../styles/CreatedClass.module.css'
import {Link,Routes,Route} from 'react-router-dom'


const  Student_class=(props)=>{
   
    return (    
        <>
        <p>{props.class_name}</p>
     <ul className={Style.container}>
       
         <li> <Link to={'*/class_materials'}>  Class material</Link></li>
     
     </ul>

     <Routes>
         <Route  path={`*/class_materials`} element={<Class_Materials class_id={props.class_id} />}/>    
     </Routes>


        </>
    )

}
export default Student_class
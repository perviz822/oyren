import Style from '../styles/CreatedClass.module.css'
import add_icon_src from '../images/add_icon.png'
import {Link,Route,Routes} from 'react-router-dom'
import ClassRequests from './ClassRequests'
const  Class = (props)=>{
    console.log('classrendered')
    const set_url_added= ()=>{
        props.set_url_added(true)
    }
    return (    
        <>
        <p>{props.class_name}</p>
     <ul className={Style.container}>
         <li><Link to={'/add_notes'}> Notes </Link> <img src={add_icon_src}/>  </li>
         <li> <Link to={'/add_video'}> Videos </Link>  <img onClick={set_url_added} src={add_icon_src}/></li> 
       
         <li> <Link to={'*/class_requests'}>   Class requests </Link></li>
     
     </ul>
     <Routes>
         <Route  path={`*/class_requests`} element={<ClassRequests class_name={props.class_name} />}/>
     </Routes>


        </>
    )
}
export default Class
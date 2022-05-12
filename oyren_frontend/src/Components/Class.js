import Style from '../styles/CreatedClass.module.css'
import add_icon_src from '../images/add_icon.png'
const  Class = ()=>{
    return (
        <>
        <p>Classname</p>
     <ul className={Style.container}>
         <li>Files <img src={add_icon_src}  /></li>
         <li>Notes  <img src={add_icon_src}/>  </li>
         <li>Videos  <img src={add_icon_src}/></li>
         <li>Students</li>
         <li>Class requests </li>
      
     </ul>
        </>
    )
}
export default Class
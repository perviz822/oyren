import magnifier_src from  '../images/magnifier.png'
import Style from '../styles/StudentHome.module.css'
const  CreateClass=(props)=>{
    return (
        <>
        {/*form*/}
 {props.is_create_class_toggled &&  <form>
<div class={Style.input_section}>
      <input placeholder="Class name" />
      <img src ={magnifier_src}></img>
  </div>
  <button  onClick={props.set_is_class_created} type='submit'className={Style.create_class_button}>Create Class</button>
</form>}
{/*form */}
        </>
    )
}

export default CreateClass
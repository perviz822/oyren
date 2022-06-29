import logo from './logo.svg';
import './App.css';
import Login from '../src/Components/Login'
import {Routes,Route} from 'react-router-dom'
import Register from '../src/Components/Register'
import TeacherRegister from '../src/Components/TeacherRegister'
import Student_home_page from './Components/Student_home_page';
import TeacherHome from './Components/TeacherHome';
import Send_file from './Components/Send_file';


function App() {
  return (
  <>
    <Routes>
      <Route path={'/home'} element={<TeacherHome />}> </Route>
      <Route path={'/'} element={<Login />} ></Route>
      <Route path={'/register_as_teacher'} element={<TeacherRegister />} />
      <Route path={'/register_as_student'} element={<Register />} />
      <Route path={'/teacher_home_page/*'}   element={<TeacherHome/>}/>
      <Route path={'/student_home_page/*'}   element={<Student_home_page/>}/>
      <Route path={'/send_image'}   element={<Send_file/>}/>

      

    </Routes>
  
  </>

   
  );
}

export default App;

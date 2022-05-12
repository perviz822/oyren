import logo from './logo.svg';
import './App.css';
import Login from '../src/Components/Login'
import {Routes,Route} from 'react-router-dom'
import Register from '../src/Components/Register'
import TeacherRegister from '../src/Components/TeacherRegister'
import Student_home_page from './Components/Student_home_page';
import TeacherHome from './Components/TeacherHome';


function App() {
  return (
  <>
    <Routes>
      <Route path={'/home'} element={<TeacherHome />}> </Route>
      <Route path={'/'} element={<Login />} ></Route>
      <Route path={'/register_as_teacher'} element={<TeacherRegister />} />
      <Route path={'/register_as_student'} element={<Register />} />
      <Route path={'/teacher_home_page/*'}   element={<TeacherHome/>}/>
      <Route path={'/student_home_page'}   element={<Student_home_page/>}/>
      

    </Routes>
  
  </>

   
  );
}

export default App;

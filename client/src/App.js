

import './App.css';
import { Routes,Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CreateNotes from './components/CreateNotes';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import EditNotes from './components/EditNotes';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';


function App() {

 

  return (
    <div className="App">
    <Navbar/>
    {/* <Home/> */}
    

    <Routes>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/createnote" element={<CreateNotes/>}></Route>
      <Route path="/editnotes/:noteid" element={<EditNotes/>}></Route>
      <Route path="/allnotes" element={<Notes/>}></Route>
    </Routes>
    <ToastContainer />
    </div>
    
  );
}

export default App;

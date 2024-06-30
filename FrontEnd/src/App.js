// import logo from './logo.svg';
// import bph from './image/bph.jpg';
import NoteState from './context/user/NoteState';
// import Navbar from './components/Navbar';
import './App.css';
// import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React,{useState} from 'react';
import Home from './pages/Home';
import AboutUs from './pages/About';
import Showmap from './pages/showmap';
import Userauthl from './pages/userauthl';
import Userauthsi from './pages/userauthsi';


function App() {

  const [usertype, setusertype] = useState(null)
  const [userstatus, setuserstatus] = useState(null)
  // const navigate = useNavigate ();
  console.log("enter the app file")
  console.log("in the app file ut",usertype);
  console.log("in the app file us",userstatus);

  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home  us1={userstatus} />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/mapint" element={<Showmap ut1 = {usertype} />} />
            <Route path="/uservar1" element={<Userauthl ut = {setusertype} us={setuserstatus}/> } />
            <Route path="/uservar2" element={<Userauthsi ut = {setusertype} us={setuserstatus}/> } />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  )
}


export default App;
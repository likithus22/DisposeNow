import { React, useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import Home from '../pages/Home';
// import AboutUs from '../pages/About';
// import userContext from "../context/user/User_context";
// import Config from '../core/config';



function Navbar(props) {
  const navigate = useNavigate ();
  console.log("in the nav bar",props.us1);
  
  const handelonclick =  () =>{
    console.log("enterd teh listner");
    if(props.us1 === "active"){
      navigate('/mapint')
    }
    else
    {
      navigate('/uservar1')
    }
  }

  return (
    <div id='outer'>
      <a href='/' id='logo' >DISPOSENOW.</a>
      <nav>
        {/* <a href="/">HOME</a>
          <a href="/aboutus">ABOUT US</a>
          <a href="/">NEWS</a>
          <a href="/">SIGN UP</a>
          <a href="/">FAQS</a> */}
        <Link className='header' to="/">HOME</Link>
        <Link className='header' to="/aboutus">ABOUT US</Link>
        <p className='header' onClick={handelonclick}>LOCATE IT</p>
        {/* <Link className='header'  to="/mapint"  >LOCATE IT</Link> */}
        <Link className='header' to="/uservar1" >LOGIN</Link>
        <Link className='header' to="/uservar2" >SIGN UP</Link>
        <Link className='header' to="/">FAQS</Link>
      </nav>
    </div>
  )
}




export default Navbar;


import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Login from '../components/loginu'
// import Signup from '../components/signupu'
import Loginc from '../components/loginc'
// import Signupc from './signupc';


function Userauth(props) {
    const navigate = useNavigate();
    console.log("enterd userauth");
    const yy = () => {
        navigate('/uservar2')
    }
    return (<>
        <h1 style={{ marginLeft: '15vw', marginTop: '30px' }}>LOGIN HERE FOR ENDPOINT</h1>
        <Login us={props.us} ut={props.ut} />
        {/* <h1 style={{ marginLeft:'15vw',marginTop:'30px' }}>REGISTER HERE FOR ENDPOINT</h1>
        <Signup us={props.us}  ut={props.ut} /> */}
        <h1 style={{ marginLeft: '15vw', marginTop: '30px' }}>LOGIN HERE FOR COLLECTOR</h1>
        <Loginc us={props.us} ut={props.ut} />
        {/* <h1 style={{ marginLeft:'15vw',marginTop:'30px' }}>REGISTER HERE FOR COLLECTOR</h1>
        <Signupc us={props.us}  ut={props.ut} /> */}
        <div class="d-grid gap-2 col-6 mx-auto" style={{ marginTop: '50px' }}>
            <button type="button" class="btn btn-primary " onClick={yy}>
                CLICK TO REGISTER
            </button>
        </div>
    </>
    )
}

export default Userauth
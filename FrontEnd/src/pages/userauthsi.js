import React from 'react'
// import Login from '../components/loginu'
import Signup from '../components/signupu'
// import Loginc from '../components/loginc'
import Signupc from './signupc';



function Userauth(props) {
    console.log("enterd userauth");
    return (<>
    {/* <h1 style={{marginLeft:'15vw',marginTop:'30px' }}>LOGIN HERE FOR ENDPOINT</h1> */}
        {/* <Login us={props.us}  ut={props.ut}/> */}
        <h1 style={{ marginLeft:'15vw',marginTop:'30px' }}>REGISTER HERE FOR ENDPOINT</h1>
        <Signup us={props.us}  ut={props.ut} />
        {/* <h1 style={{marginLeft:'15vw' ,marginTop:'30px'}}>LOGIN HERE FOR COLLECTOR</h1>
        <Loginc us={props.us}  ut={props.ut} /> */}
        <h1 style={{ marginLeft:'15vw',marginTop:'30px' }}>REGISTER HERE FOR COLLECTOR</h1>
        <Signupc us={props.us}  ut={props.ut} />
    </>
    )
}

export default Userauth
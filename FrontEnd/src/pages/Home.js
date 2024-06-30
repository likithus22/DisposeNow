import React from 'react'
import Navbar from '../components/Navbar'

function Home(props) {
    return (
        <>
            <img src="./bph.jpg" alt="how are you" id='bg_holder' />
            <Navbar us1 = {props.us1}/>
            {/* <p>this is Home</p> */}
            <div id="cousal">
                <p>Enjoy our  DISPOSENOW services from <b>9Rs</b> per month</p>
            </div>
        </>
    )
}

export default Home
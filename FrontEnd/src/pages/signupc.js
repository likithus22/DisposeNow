import React, { useState} from "react";
// import Config from "../core/config"; 
import {  useNavigate } from 'react-router-dom';
// import userContext from "../context/user/User_context";
// import getUserLocation from '../core/obtloc';




function Signupc(props) {
    


    const [conditionals, setConditionals] = useState({ name: "", address: "", phone_number: "", governmentID: "", email: "",vehicleType: "",helperAssociated: "", password: "" });
    const navigate = useNavigate();
    // const a = useContext(userContext);

    
    // useEffect(() => {
        const fetchData = async (e) => {
            e.preventDefault();
            try {
                // const locationData = await getUserLocation();
                // console.log('User location:', locationData);
                // Perform further actions with the location data
                //server connection
                // Default options are marked with *
                const response = await fetch("http://localhost:5000/api/auth/col/register", {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ name: conditionals.name, address: conditionals.address, phone_number: conditionals.phone_number, governmentID: conditionals.governmentID, email : conditionals.email,vehicleType : conditionals.vehicleType,helperAssociated:conditionals.helperAssociated,password: conditionals.password })
                });
                const feed = await response.json(); // parses JSON response into native JavaScript objects
                console.log(feed);
                if (feed.success) {
                    localStorage.setItem("token", feed.token);
                    // a.update1();
                    // a.update2(feed.token);
                    props.ut("collector");
                    props.us("active")
                    navigate('/');

                }
                else {
                    alert("invalid conditionals");
                }
            }
            catch (error) {
            console.error('Error getting user location:', error);
            }
        }
        // fetchData();
// });



    const onChange = (e) => {
        setConditionals({ ...conditionals, [e.target.name]: e.target.value })
    }

    return (<>
        <div className="container" style={{ marginTop: '50px' }}>
            {/* <h1 style={{ margin: 'auto' }}>REGISTER HERE</h1> */}
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={fetchData} >
                        <div className="mb-2">
                            <label htmlFor="name1" className="form-label">name</label>
                            <input type="name" className="form-control" id="name1" name="name" value={conditionals.name} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="ruemail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="ruemail1" name="email" value={conditionals.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone1" className="form-label">phone number</label>
                            <input type="text" className="form-control" id="phone1" name="phone_number" value={conditionals.phone_number} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address1" className="form-label">address</label>
                            <input type="address" className="form-control" id="address1" name="address" value={conditionals.address} onChange={onChange} />
                        </div>
                        {/* <div className="mb-2">
                            <label htmlFor="location" className="form-label">location</label>
                            <input type="location" className="form-control" id="location"  name="location" value={conditionals.location} onChange={onChange} />
                        </div> */}
                        <div className="mb-2">
                            <label htmlFor="govtid" className="form-label">government ID</label>
                            <input type="text" className="form-control" id="epType" name="governmentID" value={conditionals.governmentID} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="vehtype" className="form-label">vehicle type</label>
                            <input type="text" className="form-control" id="vehtype" name="vehicleType" value={conditionals.vehicleType} onChange={onChange} />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="helper" className="form-label">helper associated</label>
                            <input type="text" className="form-control" id="helper" name="helperAssociated" value={conditionals.helperAssociated} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rupassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="rupassword1" name="password" value={conditionals.password} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default Signupc;  
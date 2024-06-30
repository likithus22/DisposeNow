import React, { useState } from "react";
// import Config from "../core/config"; 
import { useNavigate } from 'react-router-dom';
// import userContext from "../context/user/User_context";
import getUserLocation from '../core/obtloc';




function Signup(props) {



    const [conditionals, setConditionals] = useState({ name: "", email: "", phone: "", address: "", locationlong: "", locationlat: "", epType: "", password: "" });
    const navigate = useNavigate();
    // const a = useContext(userContext);


    // useEffect(() => {
    const fetchData = async (e) => {
        e.preventDefault();
        try {
            const locationData = await getUserLocation();
            console.log('User location:', locationData);
            // Perform further actions with the location data
            //server connection
            // Default options are marked with *
            const response = await fetch("http://20.204.10.248:5000/api/auth/usr/register", {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ name: conditionals.name, email: conditionals.email, phone_number: conditionals.phone, address: conditionals.address, locationlong: locationData.longitude, locationlat: locationData.latitude, EP_type: conditionals.epType, password: conditionals.password })
            });
            const feed = await response.json(); // parses JSON response into native JavaScript objects
            console.log(feed);
            if (feed.success) {
                localStorage.setItem("token", feed.token);
                // a.update1();
                // a.update2(feed.token);
                props.ut("user");
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
                            <label htmlFor="name" className="form-label">name</label>
                            <input type="name" className="form-control" id="name" name="name" value={conditionals.name} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="ruemail" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="ruemail" name="email" value={conditionals.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="form-label">phone number</label>
                            <input type="phone" className="form-control" id="phone" name="phone" value={conditionals.phone} onChange={onChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="address" className="form-label">address</label>
                            <input type="address" className="form-control" id="address" name="address" value={conditionals.address} onChange={onChange} />
                        </div>
                        {/* <div className="mb-2">
                            <label htmlFor="location" className="form-label">location</label>
                            <input type="location" className="form-control" id="location"  name="location" value={conditionals.location} onChange={onChange} />
                        </div> */}
                        <div className="mb-2">
                            <label htmlFor="epType" className="form-label">end point type</label>
                            <input type="epType" className="form-control" id="epType" name="epType" value={conditionals.epType} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rupassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="rupassword" name="password" value={conditionals.password} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default Signup;  
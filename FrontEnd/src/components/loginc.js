import React, { useState, useContext } from "react";
// import Config from "../core/config"; 
import { useNavigate } from 'react-router-dom';
import userContext from "../context/user/User_context";





function Loginc(props) {
    const [conditionals, setConditionals] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const b = useContext(userContext);
    // const {typesetter, statussetter} = props;
    const handelSubmit = async (e) => {
        e.preventDefault();
        //server connection
        // Default options are marked with *
        const response = await fetch("http://20.204.10.248:5000/api/auth/col/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ email: conditionals.email, password: conditionals.password })
        });
        const feed = await response.json(); // parses JSON response into native JavaScript objects
        console.log(feed);
        
        if (feed.success) {
            localStorage.setItem("token", feed.token);
            b.update1(feed.token);
            b.update2(feed.token);
            props.ut("collector");
            props.us("active")
            navigate('/');
        }
        else {
            alert("invalid conditionals");
        }


    }

    const onChange = (e) => {
        setConditionals({ ...conditionals, [e.target.name]: e.target.value })
    }

    return (<>
        <div className="container" style={{marginTop: '50px'}}>
        {/* <h1 style={{margin:'auto'}}>LOGIN HERE</h1> */}
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handelSubmit} >
                        <div className="mb-2">
                            <label htmlFor="lcemail" className="form-label">Email address</label>
                            <input type="luemail" className="form-control" id="lcemail" aria-describedby="emailHelp" name="email" value={conditionals.email} onChange={onChange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lcpassword" className="form-label">Password</label>
                            <input type="password" className="form-control" id="lcpassword" name="password" value={conditionals.password} onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default Loginc;
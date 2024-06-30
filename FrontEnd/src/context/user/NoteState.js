import React, { useState } from "react";
import userContext from "./User_context";
const NoteState = (props) => {

    const [users, setUsers] = useState("")
    const update2 = (na) => {
        setUsers(na)
        console.log(users);
    }
    const [active, setactive] = useState(false)
    const update1 = () => {
        setactive(true)
        console.log(active);
    }


    return (
        <userContext.Provider value={{ users, update2, active, update1 }} >
            {props.children}
        </userContext.Provider>
    )
}

export default NoteState;